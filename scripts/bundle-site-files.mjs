// Packs the files pages read at request time into lib/generated/site-files.json,
// so they ship inside the server bundle. The site runs on Cloudflare Workers,
// which have no file system: content/ and public/ are not there at render time.
// Runs before `next dev` and `next build` (predev / prebuild in package.json).
import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const out = path.join(root, 'lib', 'generated', 'site-files.json')

/** Every Markdown file in content/<folder>, by slug */
function markdown(folder) {
  const dir = path.join(root, 'content', folder)
  if (!fs.existsSync(dir)) return {}
  return Object.fromEntries(
    fs
      .readdirSync(dir)
      .filter((file) => file.endsWith('.md'))
      .sort()
      .map((file) => [file.replace(/\.md$/, ''), fs.readFileSync(path.join(dir, file), 'utf8')])
  )
}

/** Width and height of an SVG from its viewBox, or its width and height attributes */
function svgDimensions(file) {
  const head = fs.readFileSync(file, 'utf8').slice(0, 2000)
  const box = head.match(/viewBox\s*=\s*["']\s*[\d.-]+[\s,]+[\d.-]+[\s,]+([\d.]+)[\s,]+([\d.]+)/)
  if (box) return { width: Math.round(Number(box[1])), height: Math.round(Number(box[2])) }
  const width = head.match(/<svg[^>]*\swidth\s*=\s*["']([\d.]+)/)
  const height = head.match(/<svg[^>]*\sheight\s*=\s*["']([\d.]+)/)
  if (width && height) return { width: Math.round(Number(width[1])), height: Math.round(Number(height[1])) }
  return undefined
}

/** Sizes of every SVG under public/, keyed by its URL path */
function svgSizes() {
  const sizes = {}
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name)
      if (entry.isDirectory()) walk(full)
      else if (entry.name.endsWith('.svg')) {
        const size = svgDimensions(full)
        if (size) sizes['/' + path.relative(path.join(root, 'public'), full).split(path.sep).join('/')] = size
      }
    }
  }
  walk(path.join(root, 'public'))
  return sizes
}

const data = {
  content: { blog: markdown('blog'), guides: markdown('guides') },
  svgSizes: svgSizes(),
  ogLogo: fs.readFileSync(path.join(root, 'public', 'brand', 'dw-logo-week-white.png')).toString('base64'),
}

fs.mkdirSync(path.dirname(out), { recursive: true })
fs.writeFileSync(out, JSON.stringify(data))
console.log(
  `site-files: ${Object.keys(data.content.blog).length} posts, ${Object.keys(data.content.guides).length} guides, ${Object.keys(data.svgSizes).length} SVG sizes`
)
