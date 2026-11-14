import { publicSvgSize } from '@/lib/site-files'

/**
 * Width and height of an SVG in /public, read from its viewBox, so an <img>
 * can reserve the right space before the file loads. Sizes are measured at
 * build time (scripts/bundle-site-files.mjs). Returns nothing for other files
 * or an SVG with no size.
 */
export function svgSize(src: string | undefined): { width?: number; height?: number } {
  if (!src || !src.startsWith('/') || !src.endsWith('.svg') || src.includes('..')) return {}
  return publicSvgSize(src.split(/[?#]/)[0]) ?? {}
}
