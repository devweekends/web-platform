import matter from 'gray-matter'
import { MetadataRoute } from 'next'

import { listDsocProjects } from '@/lib/dsoc-projects'
import pageDates from '@/lib/page-dates.json'
import { SITE_URL } from '@/lib/seo'
import { contentSlugs, readContent } from '@/lib/site-files'

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
  { path: '/fellowship/2025', changeFrequency: 'yearly', priority: 0.5 },
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
  { path: '/feed', changeFrequency: 'daily', priority: 0.6 },
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
  return contentSlugs(folder)
    .flatMap((slug) => {
      const { data } = matter(readContent(folder, slug) ?? '')
      if (data.draft === true) return []
      const date = data.date ? new Date(data.date) : undefined
      return [
        {
          url: `${baseUrl}/${folder}/${slug}`,
          lastModified: date && !Number.isNaN(date.getTime()) ? date : undefined,
          changeFrequency: 'monthly' as const,
          priority,
        },
      ]
    })
}

// Built once per deploy, on purpose. Posts and guides are read from the content
// folder, which exists while the site is built but not where pages are rendered
// later, so a sitemap rebuilt on a timer loses them.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // A page's date is when its own source last changed, from git history
  // (scripts/page-dates.mjs). Never "now": claiming every page changed on each
  // build tells search engines nothing. Posts and guides use their own dates.
  const dates: Record<string, string> = pageDates
  const staticPages = pages.map((entry) => ({
    url: `${baseUrl}${entry.path}`,
    lastModified: dates[entry.path || '/'] ? new Date(dates[entry.path || '/']) : undefined,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }))

  const projects = (await listDsocProjects()).map((project) => ({
    url: `${baseUrl}/dsoc/projects/${project.id}`,
    lastModified: project.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.5,
  }))

  return [...staticPages, ...projects, ...contentEntries('blog', 0.6), ...contentEntries('guides', 0.6)]
}
