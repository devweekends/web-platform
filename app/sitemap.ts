import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { MetadataRoute } from 'next'

import { SITE_URL } from '@/lib/seo'

const baseUrl = SITE_URL

type Entry = {
  path: string
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']
  priority: number
}

/**
 * Public pages that should be found in search. Left out on purpose:
 * - /careers and /mindmaster: kept but not promoted (unlisted and invite only)
 * - /mentor, /ambassador and /admin: logins and dashboards
 */
const pages: Entry[] = [
  { path: '', changeFrequency: 'weekly', priority: 1 },
  { path: '/team', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/fellowship', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/dsoc', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/dwosi', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/fyp-roadshow', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/mentorship', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/community', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/links', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/sessions', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/projects', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/partners', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/testimonials', changeFrequency: 'weekly', priority: 0.6 },
  { path: '/network', changeFrequency: 'monthly', priority: 0.5 },
  { path: '/ambassador-program', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/ambassadors', changeFrequency: 'monthly', priority: 0.5 },
  { path: '/blog', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/guides', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/brand', changeFrequency: 'monthly', priority: 0.4 },
  { path: '/dsoc/projects', changeFrequency: 'weekly', priority: 0.6 },
]

/** Blog posts and guides, each with its own publish date from its front matter */
function contentEntries(folder: 'blog' | 'guides', priority: number): MetadataRoute.Sitemap {
  const dir = path.join(process.cwd(), 'content', folder)
  if (!fs.existsSync(dir)) return []

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith('.md'))
    .flatMap((file) => {
      const { data } = matter(fs.readFileSync(path.join(dir, file), 'utf8'))
      if (data.draft === true) return []
      const date = data.date ? new Date(data.date) : undefined
      return [
        {
          url: `${baseUrl}/${folder}/${file.replace(/\.md$/, '')}`,
          lastModified: date && !Number.isNaN(date.getTime()) ? date : undefined,
          changeFrequency: 'monthly' as const,
          priority,
        },
      ]
    })
}

export default function sitemap(): MetadataRoute.Sitemap {
  // Static pages carry no lastModified: claiming every page changed "now" on each
  // build tells search engines nothing. Posts and guides use their real dates.
  const staticPages = pages.map((entry) => ({
    url: `${baseUrl}${entry.path}`,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }))

  return [...staticPages, ...contentEntries('blog', 0.6), ...contentEntries('guides', 0.6)]
}
