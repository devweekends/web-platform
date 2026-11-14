import matter from 'gray-matter'
import { NextRequest, NextResponse } from 'next/server'

import { htmlToMarkdown, pageFacts } from '@/lib/html-to-markdown'
import { SITE_NAME, SITE_URL } from '@/lib/seo'
import { readContent } from '@/lib/site-files'

/**
 * The Markdown version of a public page, for AI agents. The middleware sends
 * any page request that asks for `text/markdown` here, with the page's path in
 * `source`. Blog posts and guides are written in Markdown, so those are served
 * from their source file. Every other page is fetched as HTML and converted,
 * so an agent reads what a visitor reads.
 */

const PRIVATE = ['/api', '/admin', '/mentor', '/ambassador', '/.well-known', '/agent-markdown', '/_next']

function tokens(markdown: string): number {
  return Math.max(1, Math.ceil(markdown.length / 4))
}

function respond(markdown: string, status = 200) {
  return new NextResponse(markdown, {
    status,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      // Never stored: this answer shares its address with the HTML page
      'Cache-Control': 'private, no-store',
      Vary: 'Accept',
      'x-markdown-tokens': String(tokens(markdown)),
    },
  })
}

function frontMatter(facts: { title?: string; description?: string; url: string }) {
  const line = (key: string, value?: string) => (value ? `${key}: ${JSON.stringify(value)}\n` : '')
  return `---\n${line('title', facts.title)}${line('description', facts.description)}${line('url', facts.url)}site: ${JSON.stringify(SITE_NAME)}\n---\n\n`
}

function notFound(sourcePath: string) {
  return respond(`# Page not found\n\nThere is no public page at \`${sourcePath}\`. The site index for agents is at ${SITE_URL}/llms.txt\n`, 404)
}

/** A blog post or guide straight from its Markdown file */
function fromContentFile(sourcePath: string): string | undefined {
  const match = sourcePath.match(/^\/(blog|guides)\/([a-z0-9-]+)$/)
  if (!match) return undefined
  const [, folder, slug] = match
  const raw = readContent(folder as 'blog' | 'guides', slug)
  if (raw === undefined) return undefined
  const { data, content } = matter(raw)
  if (data.draft === true) return undefined
  const head = frontMatter({ title: data.title, description: data.description, url: `${SITE_URL}${sourcePath}` })
  return `${head}# ${data.title}\n\n${content.trim()}\n`
}

export async function GET(request: NextRequest) {
  // Set by the middleware. A direct call can name the page with ?source= instead.
  const requested = request.headers.get('x-markdown-source') || request.nextUrl.searchParams.get('source') || '/'
  const sourcePath = requested.length > 1 ? requested.replace(/\/+$/, '') : requested

  // Only plain page paths on this site: no files, no query, no other host
  if (!/^\/[a-zA-Z0-9\-_/]*$/.test(sourcePath) || sourcePath.includes('//')) return notFound(requested.slice(0, 80))
  if (PRIVATE.some((prefix) => sourcePath === prefix || sourcePath.startsWith(`${prefix}/`))) return notFound(sourcePath)

  const fromFile = fromContentFile(sourcePath)
  if (fromFile) return respond(fromFile)

  // In production the page always comes from the public address, whatever host the request named
  const origin = process.env.SITE_ENV === 'production' ? SITE_URL : request.nextUrl.origin
  let html: string
  try {
    const page = await fetch(`${origin}${sourcePath}`, { headers: { Accept: 'text/html' }, redirect: 'follow', cache: 'no-store' })
    if (!page.ok || !(page.headers.get('content-type') ?? '').includes('text/html')) return notFound(sourcePath)
    html = await page.text()
  } catch {
    return respond(`# Temporarily unavailable\n\nThe page at ${SITE_URL}${sourcePath} could not be read just now. Please try again.\n`, 503)
  }

  const facts = pageFacts(html)
  const body = htmlToMarkdown(html, SITE_URL)
  if (!body) return notFound(sourcePath)

  const url = facts.canonical ?? `${SITE_URL}${sourcePath === '/' ? '' : sourcePath}`
  const heading = /^# /m.test(body) || !facts.title ? '' : `# ${facts.title}\n\n`
  return respond(`${frontMatter({ title: facts.title, description: facts.description, url })}${heading}${body}\n`)
}
