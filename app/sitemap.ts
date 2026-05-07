import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://devweekends.com'
  const now = new Date()
  const entries: Array<{ path: string; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']; priority: number }> = [
    { path: '', changeFrequency: 'daily', priority: 1 },
    { path: '/about', changeFrequency: 'monthly', priority: 0.6 },
    { path: '/our-story', changeFrequency: 'monthly', priority: 0.6 },
    { path: '/community', changeFrequency: 'weekly', priority: 0.8 },
    { path: '/sessions', changeFrequency: 'daily', priority: 0.9 },
    { path: '/projects', changeFrequency: 'weekly', priority: 0.8 },
    { path: '/mentorship', changeFrequency: 'weekly', priority: 0.8 },
    { path: '/mentor', changeFrequency: 'weekly', priority: 0.7 },
    { path: '/testimonials', changeFrequency: 'weekly', priority: 0.6 },
    { path: '/careers', changeFrequency: 'daily', priority: 0.7 },
    { path: '/ambassadors', changeFrequency: 'weekly', priority: 0.7 },
    { path: '/ambassador-program', changeFrequency: 'weekly', priority: 0.7 },
    { path: '/fellowship', changeFrequency: 'weekly', priority: 0.7 },
    { path: '/network', changeFrequency: 'weekly', priority: 0.6 },
    { path: '/mindmaster', changeFrequency: 'weekly', priority: 0.6 },
    { path: '/weekend-tech-grind', changeFrequency: 'weekly', priority: 0.6 },
    { path: '/dsoc', changeFrequency: 'daily', priority: 0.8 },
    { path: '/dsoc/projects', changeFrequency: 'daily', priority: 0.7 },
    { path: '/dsoc/register', changeFrequency: 'daily', priority: 0.7 },
  ]
  
  return entries.map((entry) => ({
    url: `${baseUrl}${entry.path}`,
    lastModified: now,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }))
} 