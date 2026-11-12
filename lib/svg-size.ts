import fs from 'fs'
import path from 'path'

/**
 * Width and height of an SVG in /public, read from its viewBox, so an <img>
 * can reserve the right space before the file loads. Server only. Returns
 * nothing for other files or when the file cannot be read.
 */
export function svgSize(src: string | undefined): { width?: number; height?: number } {
  if (!src || !src.startsWith('/') || !src.endsWith('.svg') || src.includes('..')) return {}
  try {
    const head = fs.readFileSync(path.join(process.cwd(), 'public', src), 'utf8').slice(0, 2000)
    const box = head.match(/viewBox\s*=\s*["']\s*[\d.-]+[\s,]+[\d.-]+[\s,]+([\d.]+)[\s,]+([\d.]+)/)
    if (box) return { width: Math.round(Number(box[1])), height: Math.round(Number(box[2])) }
    const width = head.match(/<svg[^>]*\swidth\s*=\s*["']([\d.]+)/)
    const height = head.match(/<svg[^>]*\sheight\s*=\s*["']([\d.]+)/)
    if (width && height) return { width: Math.round(Number(width[1])), height: Math.round(Number(height[1])) }
  } catch {
    // Not on disk at render time: the image still shows, only without reserved space
  }
  return {}
}
