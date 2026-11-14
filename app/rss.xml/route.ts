import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

import { SITE_NAME, SITE_URL, excerptOf } from '@/lib/seo'

// Built with the site, like the sitemap: posts and guides are read from the
// content folder, which is only there at build time.
export const dynamic = 'force-static'

type Item = { title: string; url: string; date?: Date; description?: string }

function items(folder: 'blog' | 'guides'): Item[] {
  const dir = path.join(process.cwd(), 'content', folder)
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith('.md'))
    .flatMap((file) => {
      const { data, content } = matter(fs.readFileSync(path.join(dir, file), 'utf8'))
      if (data.draft === true || !data.title) return []
      const date = data.date ? new Date(data.date) : undefined
      return [
        {
          title: String(data.title),
          url: `${SITE_URL}/${folder}/${file.replace(/\.md$/, '')}`,
          date: date && !Number.isNaN(date.getTime()) ? date : undefined,
          description: data.description ?? excerptOf(content),
        },
      ]
    })
}

const escape = (text: string) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;')

/** RSS 2.0 feed of every post and guide, newest first */
export function GET() {
  const all = [...items('blog'), ...items('guides')].sort((a, b) => (b.date?.getTime() ?? 0) - (a.date?.getTime() ?? 0))
  const newest = all.find((item) => item.date)?.date

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escape(SITE_NAME)}: news, guides and blog</title>
    <link>${SITE_URL}/blog</link>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    <description>News, practical guides and stories from Dev Weekends.</description>
    <language>en</language>${newest ? `\n    <lastBuildDate>${newest.toUTCString()}</lastBuildDate>` : ''}
${all
  .map(
    (item) => `    <item>
      <title>${escape(item.title)}</title>
      <link>${item.url}</link>
      <guid isPermaLink="true">${item.url}</guid>${item.date ? `\n      <pubDate>${item.date.toUTCString()}</pubDate>` : ''}${
        item.description ? `\n      <description>${escape(item.description)}</description>` : ''
      }
    </item>`
  )
  .join('\n')}
  </channel>
</rss>
`

  return new Response(body, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  })
}
