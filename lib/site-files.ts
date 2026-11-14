import siteFiles from '@/lib/generated/site-files.json'

/**
 * Posts, guides and a few public files, packed into the bundle at build time by
 * scripts/bundle-site-files.mjs. Workers have no file system, so pages read
 * these instead of content/ and public/.
 */

export type ContentFolder = 'blog' | 'guides'

const content = siteFiles.content as Record<ContentFolder, Record<string, string>>

/** Slugs of every Markdown file in content/<folder>, in file name order */
export function contentSlugs(folder: ContentFolder): string[] {
  return Object.keys(content[folder] ?? {})
}

/** The raw Markdown (front matter included) of content/<folder>/<slug>.md, if it exists */
export function readContent(folder: ContentFolder, slug: string): string | undefined {
  const files = content[folder] ?? {}
  return Object.prototype.hasOwnProperty.call(files, slug) ? files[slug] : undefined
}

/** Width and height of an SVG in /public, keyed by its URL path */
export function publicSvgSize(src: string): { width: number; height: number } | undefined {
  return (siteFiles.svgSizes as Record<string, { width: number; height: number }>)[src]
}

/** public/brand/dw-logo-week-white.png as base64 */
export const ogLogoBase64: string = siteFiles.ogLogo
