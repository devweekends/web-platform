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
      potentialAction: {
        '@type': 'SearchAction',
        target: `${SITE_URL}/sessions`,
        'query-input': 'required name=search_term_string',
      },
    },
  ],
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
  const title = typeof meta.title === 'string' ? `${meta.title} | ${SITE_NAME}` : undefined
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
