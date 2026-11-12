/**
 * An image address that goes through the site's image optimizer at a given
 * width, for plain <img> tags whose source comes from data (project images,
 * for example). The optimizer only accepts this site's own files and the hosts
 * listed in next.config.js, so anything else is returned unchanged.
 *
 * `width` must be one of the sizes the optimizer serves.
 */
export function resizedImage(src: string, width: 384 | 640 | 828 | 1080 | 1920): string {
  const local = src.startsWith('/') && !src.startsWith('//') && !src.startsWith('/_next/')
  const accepted = local || src.startsWith('https://res.cloudinary.com/')
  if (!accepted || /\.svg(\?|$)/i.test(src)) return src
  return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=75`
}
