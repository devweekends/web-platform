/**
 * Server-side logic for the /feed LinkedIn wall: validating LinkedIn post URLs,
 * discovering #DevWeekends posts through the Olostep Search API, checking them
 * against LinkedIn's public embed, and reading and writing them in MongoDB.
 *
 * Only public pages are used: no LinkedIn login or private API. Excerpts are
 * search snippets, not full post content.
 */
import connectDB from '@/lib/db'
import { FeedCollectorState } from '@/models/FeedCollectorState'
import { LinkedInPost, type LinkedInPostSource, type LinkedInPostStatus } from '@/models/LinkedInPost'
import starterPosts from '@/data/linkedin-posts.json'
import { OFFICIAL_HANDLES, linkedInEmbedUrl, type FeedPost } from './linkedin-feed-shared'

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
/** LinkedIn pages fetched at once when checking posts */
const CHECKS_IN_PARALLEL = 6
/** Most new posts one collection run checks; the rest wait in "Pending review" */
const MAX_CHECKS_PER_RUN = 120

export const HIDDEN_NO_MENTION = 'The post text does not mention Dev Weekends'
export const HIDDEN_GONE = 'The post was deleted on LinkedIn'

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

/** A post ready to insert, with the status (and check result) it should get */
interface NewPost extends PostInput {
  status: LinkedInPostStatus
  checkedAt?: Date
  hiddenReason?: string
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

/**
 * Cheap first filter on search results. Snippets can quote text from around the
 * post (comments, the author's headline, "more posts" boxes), so a match here is
 * only a lead; checkPost decides.
 */
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

const MENTION_RE = /dev\s*-?\s*weekends/i
const POST_TEXT_RE = /class="[^"]*attributed-text-segment-list__content[^"]*"[^>]*>([\s\S]*?)<\/p>/g
const META_TEXT_RE = /<meta (?:property|name)="(?:og|twitter):(?:title|description)" content="([^"]*)"/g

function decodeEntities(text: string) {
  return text
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number(dec)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
}

/**
 * The post's own words from its embed page: the post body and the title and
 * description LinkedIn puts in the page meta. Leaves out the author's headline
 * and everything else around the post. Empty when the page has no post on it.
 */
export function postTextFromEmbed(page: string) {
  const parts = [...page.matchAll(POST_TEXT_RE), ...page.matchAll(META_TEXT_RE)].map((match) => match[1])
  return decodeEntities(parts.join(' ').replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim()
}

/**
 * - `mentions`: the post's own text mentions Dev Weekends (or it's the official page)
 * - `no-mention`: the post loaded and doesn't mention Dev Weekends
 * - `gone`: LinkedIn says the post no longer exists
 * - `unknown`: LinkedIn didn't show the post (rate limit, login wall, network error), so nothing can be said
 */
export type PostCheck = 'mentions' | 'no-mention' | 'gone' | 'unknown'

/** Checks one post against its public LinkedIn embed, the same page /feed shows */
export async function checkPost(activityId: string, handle: string): Promise<PostCheck> {
  if (OFFICIAL_HANDLES.has(handle)) return 'mentions'
  let response: Response
  try {
    response = await fetch(linkedInEmbedUrl(activityId), {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
      },
      signal: AbortSignal.timeout(20_000),
      cache: 'no-store',
    })
  } catch {
    return 'unknown'
  }
  if (response.status === 404 || response.status === 410) return 'gone'
  if (!response.ok) return 'unknown'
  const text = postTextFromEmbed(await response.text().catch(() => ''))
  if (!text) return 'unknown'
  return MENTION_RE.test(text) ? 'mentions' : 'no-mention'
}

/** Checks posts a few at a time; results line up with the input */
async function checkPosts(posts: { activityId: string; handle: string }[]) {
  const results: PostCheck[] = []
  for (let i = 0; i < posts.length; i += CHECKS_IN_PARALLEL) {
    const batch = posts.slice(i, i + CHECKS_IN_PARALLEL)
    results.push(...(await Promise.all(batch.map((post) => checkPost(post.activityId, post.handle)))))
  }
  return results
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

  const found = results
    .flatMap((r) => (r.status === 'fulfilled' ? r.value : []))
    .filter(mentionsDevWeekends)
    .map((hit) =>
      makePost(hit.url ?? hit.link ?? '', hit.title, hit.description ?? hit.snippet ?? '', 'olostep-search-index')
    )
    .filter((post): post is PostInput => post !== null)
  // The same post often comes back from several searches; keep the copy with a snippet
  const posts = [
    ...found.reduce((byId, post) => {
      if (!byId.get(post.activityId)?.excerpt) byId.set(post.activityId, post)
      return byId
    }, new Map<string, PostInput>()).values(),
  ]

  await connectDB()
  const known = new Set<string>(
    await LinkedInPost.distinct('activityId', { activityId: { $in: posts.map((post) => post.activityId) } })
  )
  const fresh = posts.filter((post) => !known.has(post.activityId))

  // A search hit is only a lead: a post goes live when its own text on LinkedIn mentions Dev Weekends
  const toCheck = fresh.slice(0, MAX_CHECKS_PER_RUN)
  const checks = await checkPosts(toCheck)
  const now = new Date()
  const verdicts = new Map(toCheck.map((post, i) => [post.activityId, checks[i]]))
  const newPosts: NewPost[] = []
  let skipped = 0
  for (const post of fresh) {
    const check = verdicts.get(post.activityId) ?? 'unknown'
    if (check === 'mentions') newPosts.push({ ...post, status: 'approved', checkedAt: now })
    // Kept as hidden so the same post isn't fetched again on every search
    else if (check === 'no-mention') newPosts.push({ ...post, status: 'hidden', checkedAt: now, hiddenReason: HIDDEN_NO_MENTION })
    else if (check === 'gone') skipped++
    // Couldn't check it: an admin decides
    else newPosts.push({ ...post, status: 'pending' })
  }

  const enriched = await enrichExcerpts(posts.filter((post) => known.has(post.activityId)))
  await LinkedInPost.insertMany(newPosts, { ordered: false }).catch(ignoreDuplicates)
  const countWith = (status: LinkedInPostStatus) => newPosts.filter((post) => post.status === status).length
  return {
    queries: queries.length,
    failedQueries: failed,
    candidates: posts.length,
    added: countWith('approved'),
    rejected: countWith('hidden') + skipped,
    needsReview: countWith('pending'),
    enriched,
    searchListSize: allQueries.length,
  }
}

/** Another request may have inserted the same post in the meantime; that's fine */
function ignoreDuplicates(error: { code?: number; writeErrors?: { code?: number }[] }) {
  const errors = error.writeErrors ?? [error]
  if (!errors.every((e) => e.code === 11000)) throw error
}

/** Fills in missing excerpts on posts already in the database */
async function enrichExcerpts(posts: PostInput[]) {
  let enriched = 0
  for (const post of posts) {
    if (!post.excerpt) continue
    const result = await LinkedInPost.updateOne(
      { activityId: post.activityId, excerpt: { $in: ['', null] } },
      { excerpt: post.excerpt }
    )
    enriched += result.modifiedCount
  }
  return enriched
}

/** Live posts from the starter list and search that haven't been checked against LinkedIn yet */
const UNCHECKED_LIVE = {
  status: 'approved',
  source: { $in: ['seed', 'olostep-search-index'] },
  checkedAt: { $exists: false },
}

/**
 * Checks the next `limit` live posts after `after` (a post _id) against LinkedIn
 * and hides the ones whose text doesn't mention Dev Weekends or that were
 * deleted. Hiding is reversible from the admin. Posts LinkedIn wouldn't show are
 * left alone. Admin-added and approved posts are never touched.
 */
export async function recheckLivePosts(after: string | undefined, limit = 40) {
  await connectDB()
  const filter = after ? { ...UNCHECKED_LIVE, _id: { $gt: after } } : UNCHECKED_LIVE
  const posts = await LinkedInPost.find(filter)
    .sort({ _id: 1 })
    .limit(limit)
    .select('_id activityId handle author url')
    .lean<{ _id: { toString(): string }; activityId: string; handle: string; author: string; url: string }[]>()
  const checks = await checkPosts(posts)
  const now = new Date()

  const hidden: { author: string; url: string; reason: string }[] = []
  let unknown = 0
  for (const [i, post] of posts.entries()) {
    const check = checks[i]
    if (check === 'unknown') {
      unknown++
      continue
    }
    if (check === 'mentions') {
      await LinkedInPost.updateOne({ _id: post._id }, { checkedAt: now })
      continue
    }
    const reason = check === 'gone' ? HIDDEN_GONE : HIDDEN_NO_MENTION
    // Only if it's still live and unchecked, so an admin's decision in the meantime wins
    const result = await LinkedInPost.updateOne(
      { _id: post._id, status: 'approved', checkedAt: { $exists: false } },
      { status: 'hidden', hiddenReason: reason, checkedAt: now }
    )
    if (result.modifiedCount) hidden.push({ author: post.author, url: post.url, reason })
  }

  const last = posts.at(-1)?._id.toString()
  return {
    checked: posts.length,
    hidden,
    unknown,
    lastId: last,
    remaining: last ? await LinkedInPost.countDocuments({ ...UNCHECKED_LIVE, _id: { $gt: last } }) : 0,
  }
}

/** Adds LinkedIn post links pasted by an admin. Admins are trusted, so the posts go live straight away. */
export async function importPostUrls(text: string) {
  const urls = text.split(/[\s,]+/).filter(Boolean)
  const posts = urls
    .map((url) => makePost(url, '', '', 'admin-import'))
    .filter((post): post is PostInput => post !== null)
  const unique = [...new Map(posts.map((post) => [post.activityId, post])).values()]
  const saved = await savePosts(unique, 'approved', new Date())
  return { links: urls.length, invalid: urls.length - posts.length, ...saved, alreadyThere: unique.length - saved.added }
}

/**
 * Inserts new posts and fills in missing excerpts. Never overwrites a post's status or curated fields.
 * Pass `checkedAt` when a person chose these posts, so the automatic check leaves them alone.
 */
export async function savePosts(posts: PostInput[], status: LinkedInPostStatus, checkedAt?: Date) {
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
    await LinkedInPost.create(checkedAt ? { ...post, status, checkedAt } : { ...post, status })
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
