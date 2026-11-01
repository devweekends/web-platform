/**
 * Server-side logic for the /feed LinkedIn wall: validating LinkedIn post URLs,
 * discovering #DevWeekends posts through the Olostep Search API, and reading and
 * writing them in MongoDB.
 *
 * Only public search results are used: no LinkedIn login, private API or
 * scraping. Excerpts are search snippets, not full post content.
 */
import connectDB from '@/lib/db'
import { FeedCollectorState } from '@/models/FeedCollectorState'
import { LinkedInPost, type LinkedInPostSource, type LinkedInPostStatus } from '@/models/LinkedInPost'
import starterPosts from '@/data/linkedin-posts.json'
import { OFFICIAL_HANDLES, type FeedPost } from './linkedin-feed-shared'

const ACTIVITY_RE = /(?:^|[-_/])activity-(\d{16,21})(?:-|$)/

const TOPIC_TERMS: [string, string[]][] = [
  ['fellowship', ['fellowship', 'fellow', 'cohort', 'certificate', 'bronze', 'summer']],
  ['engineering', ['architecture', 'database', 'devops', 'aws', 'kubernetes', 'observability', 'softwareengineering', 'systems', 'backend', 'microservices', 'performance', 'http']],
  ['open-source', ['opensource', 'open-source', 'gsoc', 'dsoc', 'lfx', 'github', 'apache']],
  ['coding', ['dsa', 'data-structure', 'datastructure', 'algorithm', 'leetcode', 'coding', 'icpc', 'recursion', 'trees']],
  ['web', ['javascript', 'react', 'nextjs', 'mern', 'webdev', 'frontend', 'fullstack', 'html', 'css']],
  ['ai', ['artificialintelligence', 'machinelearning', 'ai', 'llm', 'dataengineering', 'python']],
]

const KNOWN_AUTHORS: Record<string, string> = {
  devweekends: 'Dev Weekends',
  'dev-weekends': 'Dev Weekends',
  zeeshanadilbutt: 'Zeeshan Adil',
  junaiddshaukat: 'Junaid Shaukat',
  'swe-talha-amjad': 'Talha Amjad',
  moeezahmad01: 'Moeez Ahmad',
  'im-shafiqurrehman': 'Shafiq ur Rehman',
  arslanchoudhary: 'Arslan Choudhary',
}

/** Results per Olostep search; 25 is the API maximum */
const RESULTS_PER_SEARCH = 25
const SEARCHES_IN_PARALLEL = 8

/** Searches about programs, topics and years. Member searches are added on top (see searchQueries). */
const TOPIC_SEARCHES = [
  '"#DevWeekends"',
  '"Dev Weekends"',
  '"#DevWeekendsFellowship"',
  '"Dev Weekends Fellowship" 2026',
  '"Dev Weekends Fellowship" 2025',
  '"Dev Weekends Fellowship" 2024',
  '"Dev Weekends Fellowship" 2023',
  '"Dev Weekends" certificate',
  '"Dev Weekends" selected',
  '"Dev Weekends" completed',
  '"Dev Weekends" mentor',
  '"Dev Weekends" mentorship',
  '"Dev Weekends" DSA',
  '"Dev Weekends" MERN',
  '"Dev Weekends" "full stack"',
  '"Dev Weekends" "AI engineering"',
  '"Dev Weekends" DSOC',
  '"Dev Weekends" "summer of code"',
  '"Dev Weekends" GSoC',
  '"Dev Weekends" LFX',
  '"Dev Weekends" "open source"',
  '"Dev Weekends" MindMaster',
  '"Dev Weekends" "Tech Talk"',
  '"Dev Weekends" FYP',
  '"Dev Weekends" roadshow',
  '"Dev Weekends" "Weekend Tech Grind"',
  '"Dev Weekends" ICPC',
  '"Dev Weekends" bootcamp',
  '"Dev Weekends" DevOps',
  '"Dev Weekends" Kubernetes',
  '"Dev Weekends" "system design"',
  '"Dev Weekends" internship',
  '"Dev Weekends" "remote job"',
  '"Dev Weekends" session',
  '"Dev Weekends" workshop',
  '"Dev Weekends" ambassador',
  '"Dev Weekends" project',
  '"Dev Weekends" journey',
  '"Dev Weekends" LeetCode',
  '"Dev Weekends" Python',
]

/**
 * The full search list: topic searches, then one search per known member, so
 * every member we find leads to their other Dev Weekends posts.
 */
function searchQueries(memberNames: string[]) {
  return [
    ...TOPIC_SEARCHES,
    ...memberNames.map((name) => `"${name.replace(/"/g, '')}" "Dev Weekends"`),
  ].map((terms) => `site:linkedin.com/posts ${terms}`)
}

/** Returns the canonical post URL and activity ID, or null for anything that isn't a public LinkedIn post URL */
export function canonicalize(raw: unknown): { url: string; activityId: string } | null {
  let parsed: URL
  try {
    parsed = new URL(String(raw ?? '').trim())
  } catch {
    return null
  }
  if (parsed.protocol !== 'https:') return null
  if (parsed.hostname !== 'www.linkedin.com' && parsed.hostname !== 'linkedin.com') return null
  if (!parsed.pathname.startsWith('/posts/')) return null
  const match = parsed.pathname.match(ACTIVITY_RE)
  if (!match) return null
  return { url: `https://www.linkedin.com${parsed.pathname.replace(/\/$/, '')}`, activityId: match[1] }
}

function topicFor(slug: string) {
  const lower = slug.toLowerCase()
  return TOPIC_TERMS.find(([, terms]) => terms.some((term) => lower.includes(term)))?.[0] ?? 'community'
}

function friendlyAuthor(handle: string) {
  if (KNOWN_AUTHORS[handle]) return KNOWN_AUTHORS[handle]
  const cleaned = handle.replace(/-(?:[0-9a-f]{7,}|\d{4,})$/, '').replace(/\d+$/, '')
  const name = cleaned
    .split('-')
    .filter(Boolean)
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(' ')
  return name || 'Community member'
}

/** LinkedIn activity IDs encode the post time: the top bits are milliseconds since 1970 */
function postedAtFrom(activityId: string): Date | undefined {
  try {
    const date = new Date(Number(BigInt(activityId) >> BigInt(22)))
    return Number.isNaN(date.getTime()) ? undefined : date
  } catch {
    return undefined
  }
}

interface PostInput {
  activityId: string
  url: string
  author: string
  handle: string
  title: string
  excerpt: string
  topic: string
  tags: string[]
  postedAt?: Date
  source: LinkedInPostSource
}

/** Builds a post record from a LinkedIn post URL and optional search title and snippet */
export function makePost(url: string, title = '', description = '', source: LinkedInPostSource): PostInput | null {
  const parsed = canonicalize(url)
  if (!parsed) return null
  const slug = decodeURIComponent(parsed.url.split('/').pop() ?? '')
  const [handle, ...rest] = slug.split('_')
  const fragments = rest.join('_').split('-activity-')[0]
  const tags = fragments.split(/[-_]/).filter((tag) => tag.length > 2).slice(0, 5)

  let cleanTitle = String(title).trim()
  if (!cleanTitle || cleanTitle.toLowerCase().endsWith("'s post")) {
    cleanTitle =
      tags
        .slice(0, 3)
        .map((tag) => tag.replace('devweekends', 'Dev Weekends').replace(/^./, (c) => c.toUpperCase()))
        .join(' · ') || 'Community update'
  }

  return {
    activityId: parsed.activityId,
    url: parsed.url,
    author: friendlyAuthor(handle),
    handle,
    title: cleanTitle.slice(0, 160),
    excerpt: String(description).replace(/\s+/g, ' ').trim().slice(0, 360),
    topic: topicFor(fragments),
    tags,
    postedAt: postedAtFrom(parsed.activityId),
    source,
  }
}

interface OlostepLink {
  url?: string
  link?: string
  title?: string
  description?: string
  snippet?: string
}

/** Search engines can surface unrelated posts, so keep only results that clearly mention Dev Weekends */
function mentionsDevWeekends(hit: OlostepLink) {
  const link = String(hit.url ?? hit.link ?? '').toLowerCase()
  const text = [hit.title, hit.description, hit.snippet].join(' ').toLowerCase()
  return (
    link.includes('devweekends') ||
    link.includes('dev-weekends') ||
    text.includes('#devweekends') ||
    text.includes('dev weekends fellowship')
  )
}

async function searchOlostep(apiKey: string, query: string): Promise<OlostepLink[]> {
  const response = await fetch('https://api.olostep.com/v1/searches', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, limit: RESULTS_PER_SEARCH, include_domains: ['linkedin.com'] }),
    signal: AbortSignal.timeout(75_000),
    cache: 'no-store',
  })
  if (!response.ok) throw new Error(`Olostep search failed with ${response.status}`)
  const data = await response.json()
  return data?.result?.links ?? []
}

/**
 * Runs the next `maxQueries` searches from the search list and saves new posts.
 * Remembers where it stopped, so consecutive runs (daily cron, admin buttons)
 * work through the whole list instead of repeating the same searches.
 */
export async function collectFromOlostep(apiKey: string, maxQueries = 5) {
  await connectDB()
  const memberNames: string[] = await LinkedInPost.distinct('author', {
    status: 'approved',
    handle: { $nin: [...OFFICIAL_HANDLES] },
  })
  // A fallback name can't find anyone's posts, so it would only waste credits
  const allQueries = searchQueries(memberNames.filter((name) => name !== 'Community member').sort())
  const count = Math.min(Math.max(1, maxQueries), allQueries.length)

  const state = await FeedCollectorState.findById('linkedin').lean<{ cursor: number }>()
  const start = (state?.cursor ?? 0) % allQueries.length
  const queries = Array.from({ length: count }, (_, i) => allQueries[(start + i) % allQueries.length])

  const results: PromiseSettledResult<OlostepLink[]>[] = []
  for (let i = 0; i < queries.length; i += SEARCHES_IN_PARALLEL) {
    const batch = queries.slice(i, i + SEARCHES_IN_PARALLEL)
    results.push(...(await Promise.allSettled(batch.map((query) => searchOlostep(apiKey, query)))))
  }
  const failed = results.filter((r) => r.status === 'rejected').length

  // Only move on when some searches worked, so a bad key or an outage doesn't skip part of the list
  if (failed < queries.length) {
    await FeedCollectorState.updateOne(
      { _id: 'linkedin' },
      { cursor: (start + count) % allQueries.length },
      { upsert: true }
    )
  }

  const posts = results
    .flatMap((r) => (r.status === 'fulfilled' ? r.value : []))
    .filter(mentionsDevWeekends)
    .map((hit) =>
      makePost(hit.url ?? hit.link ?? '', hit.title, hit.description ?? hit.snippet ?? '', 'olostep-search-index')
    )
    .filter((post): post is PostInput => post !== null)

  // Search results are trusted enough to publish directly; visitor submissions are not
  const saved = await savePosts(posts, 'approved')
  return {
    queries: queries.length,
    failedQueries: failed,
    candidates: posts.length,
    ...saved,
    searchListSize: allQueries.length,
  }
}

/** Adds LinkedIn post links pasted by an admin. Admins are trusted, so the posts go live straight away. */
export async function importPostUrls(text: string) {
  const urls = text.split(/[\s,]+/).filter(Boolean)
  const posts = urls
    .map((url) => makePost(url, '', '', 'admin-import'))
    .filter((post): post is PostInput => post !== null)
  const unique = [...new Map(posts.map((post) => [post.activityId, post])).values()]
  const saved = await savePosts(unique, 'approved')
  return { links: urls.length, invalid: urls.length - posts.length, ...saved, alreadyThere: unique.length - saved.added }
}

/** Inserts new posts and fills in missing excerpts. Never overwrites a post's status or curated fields. */
export async function savePosts(posts: PostInput[], status: LinkedInPostStatus) {
  await connectDB()
  let added = 0
  let enriched = 0
  for (const post of posts) {
    const existing = await LinkedInPost.findOne({ activityId: post.activityId }).select('excerpt')
    if (existing) {
      if (!existing.excerpt && post.excerpt) {
        existing.excerpt = post.excerpt
        await existing.save()
        enriched++
      }
      continue
    }
    await LinkedInPost.create({ ...post, status })
    added++
  }
  return { added, enriched }
}

type StarterPost = (typeof starterPosts)[number]

function starterToFeedPost(post: StarterPost): FeedPost {
  return {
    id: post.id,
    url: post.url,
    author: post.author,
    handle: post.handle,
    title: post.title,
    excerpt: post.excerpt,
    topic: post.topic,
    tags: post.tags,
    postedAt: post.postedAt,
  }
}

/** Loads the bundled starter posts into an empty collection, so a fresh database needs no manual seeding */
async function ensureSeeded() {
  if ((await LinkedInPost.estimatedDocumentCount()) > 0) return
  await LinkedInPost.insertMany(
    starterPosts.map((post) => ({
      activityId: post.id,
      url: post.url,
      author: post.author,
      handle: post.handle,
      title: post.title,
      excerpt: post.excerpt,
      topic: post.topic,
      tags: post.tags,
      postedAt: post.postedAt ? new Date(post.postedAt) : undefined,
      source: 'seed',
      status: 'approved',
    })),
    { ordered: false }
  )
}

/** Approved posts, newest first. Falls back to the bundled starter posts when the database is unavailable. */
export async function getFeedPosts(): Promise<FeedPost[]> {
  if (!process.env.MONGODB_URI) return starterPosts.map(starterToFeedPost)
  try {
    await connectDB()
    await ensureSeeded()
    const posts = await LinkedInPost.find({ status: 'approved' })
      .select('activityId url author handle title excerpt topic tags postedAt')
      .sort({ postedAt: -1 })
      .lean<
        {
          activityId: string
          url: string
          author: string
          handle: string
          title: string
          excerpt: string
          topic: string
          tags: string[]
          postedAt?: Date
        }[]
      >()
    return posts.map((post) => ({
      id: post.activityId,
      url: post.url,
      author: post.author,
      handle: post.handle,
      title: post.title,
      excerpt: post.excerpt,
      topic: post.topic,
      tags: post.tags,
      postedAt: post.postedAt ? new Date(post.postedAt).toISOString() : null,
    }))
  } catch (error) {
    console.error('Unable to load LinkedIn feed posts, using starter posts:', error)
    return starterPosts.map(starterToFeedPost)
  }
}
