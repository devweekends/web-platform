/**
 * Shared SEO facts and JSON-LD builders. One place for the site name, URL and
 * social profiles so the root layout, blog posts and guides never drift apart.
 */

import type { Metadata } from 'next'

// The live site answers on www; the bare domain redirects there
export const SITE_URL = 'https://www.devweekends.com'
export const SITE_NAME = 'Dev Weekends'
export const SITE_TAGLINE = 'Great engineers. Greater impact.'

export const SOCIAL_PROFILES = [
  'https://www.linkedin.com/company/devweekends/',
  'https://www.youtube.com/@devweekends',
  'https://www.instagram.com/devweekends',
  'https://github.com/devweekends',
]

/**
 * What the site allows machines to do with its content, in the Content Signals
 * vocabulary: show it in search, use it to answer questions (AI answers that
 * cite the site), but not train models on it. Stated in robots.txt and
 * repeated in the llms files.
 */
export const CONTENT_SIGNAL = 'search=yes, ai-input=yes, ai-train=no'

const ORGANIZATION_ID = `${SITE_URL}/#organization`

/** Organization and WebSite, rendered once in the root layout */
export const siteJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': ORGANIZATION_ID,
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/favicons/android-chrome-512x512.png`,
      slogan: SITE_TAGLINE,
      description:
        'Dev Weekends is a free, nonprofit community of engineers founded in 2018, with programs, mentorship, open source and partnerships.',
      foundingDate: '2018',
      sameAs: SOCIAL_PROFILES,
    },
    {
      '@type': 'WebSite',
      name: SITE_NAME,
      url: SITE_URL,
      description:
        'Learning community for software engineers through events, mentorship, projects, and programs.',
      publisher: { '@id': ORGANIZATION_ID },
    },
  ],
}

/**
 * A page description from the first paragraph of a Markdown body, for posts
 * whose front matter has none. Cut at a word, within what search results show.
 */
export function excerptOf(markdown: string, max = 155): string | undefined {
  // Opening paragraphs, joined until there is enough to describe the page
  let paragraph = ''
  for (const block of markdown.split(/\n\s*\n/).map((part) => part.trim())) {
    if (!block || /^(#|!\[|<|>|\||---|```|[-*] )/.test(block)) continue
    paragraph = paragraph ? `${paragraph} ${block}` : block
    if (paragraph.length >= 110) break
  }
  if (!paragraph) return undefined
  const text = paragraph
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[*_`]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
  if (text.length <= max) return text
  return `${text.slice(0, text.lastIndexOf(' ', max - 1)).replace(/[\s,;:.]+$/, '')}...`
}

/**
 * A description cut to what a search result shows (about 160 characters):
 * whole sentences while they fit, otherwise the first one cut at a word. The
 * page itself still shows the full text.
 */
export function snippetOf(text: string | undefined, max = 160): string | undefined {
  if (!text) return undefined
  const clean = text.replace(/\s+/g, ' ').trim()
  if (clean.length <= max) return clean
  let kept = ''
  for (const sentence of clean.split(/(?<=[.!?])\s+(?=[A-Z0-9"'])/)) {
    const next = kept ? `${kept} ${sentence}` : sentence
    if (next.length > max) break
    kept = next
  }
  if (kept.length >= 70) return kept
  return `${clean.slice(0, clean.lastIndexOf(' ', max - 4)).replace(/[\s,;:.]+$/, '')}...`
}

/** Long headlines fill the search result by themselves, so they go without the site name */
export function pageTitle(title: string): string | { absolute: string } {
  return title.length > 48 ? { absolute: title } : title
}

/** BlogPosting for a post page. Dates and images are optional in front matter. */
export function blogPostingJsonLd({
  slug,
  title,
  description,
  date,
  image,
  author,
  folder = 'blog',
}: {
  slug: string
  title: string
  description?: string
  date?: unknown
  image?: string
  author?: string
  folder?: 'blog' | 'guides'
}) {
  const parsed = date ? new Date(date as string) : undefined
  const published = parsed && !Number.isNaN(parsed.getTime()) ? parsed.toISOString() : undefined
  const url = `${SITE_URL}/${folder}/${slug}`

  return {
    '@context': 'https://schema.org',
    '@type': folder === 'blog' ? 'BlogPosting' : 'Article',
    headline: title,
    description,
    url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    datePublished: published,
    dateModified: published,
    image: image ? [image.startsWith('http') ? image : `${SITE_URL}${image}`] : undefined,
    author: author
      ? { '@type': 'Person', name: author }
      : { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    publisher: { '@id': ORGANIZATION_ID },
    inLanguage: 'en',
  }
}

/** Serialise JSON-LD for a script tag. Escapes "<" so a title cannot close the tag. */
export function jsonLdString(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\u003c')
}

/**
 * Fills Open Graph and Twitter tags from a page's own title, description and
 * canonical. Next replaces a parent's openGraph object rather than merging it,
 * so without this every page would share the root layout's home page title.
 * The default share image is repeated here for the same reason.
 */
export function withSocial(meta: Metadata): Metadata {
  // A plain title gets the site name, as in the browser tab. An absolute one is used as it is.
  const title =
    typeof meta.title === 'string'
      ? `${meta.title} | ${SITE_NAME}`
      : meta.title && typeof meta.title === 'object' && 'absolute' in meta.title
        ? meta.title.absolute
        : undefined
  const description = meta.description ?? undefined
  const canonical = typeof meta.alternates?.canonical === 'string' ? meta.alternates.canonical : undefined

  return {
    ...meta,
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      locale: 'en_US',
      url: canonical,
      title,
      description,
      images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: `${SITE_NAME}. ${SITE_TAGLINE}` }],
      ...meta.openGraph,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: '@devweekends',
      images: ['/twitter-image'],
      ...meta.twitter,
    },
  }
}
