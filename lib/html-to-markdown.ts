/**
 * Turns the HTML of one of this site's own pages into plain Markdown for AI
 * agents that ask for `text/markdown`. Small on purpose: it only has to read
 * HTML this site renders, so it walks the tags once and needs no dependency.
 *
 * Kept: headings, paragraphs, lists, links, emphasis and the alt text of
 * linked images. Dropped: scripts, styles, icons, forms, buttons and anything
 * marked `aria-hidden`, such as the decorative marquees.
 */

const SKIPPED = new Set(['script', 'style', 'svg', 'noscript', 'template', 'iframe', 'button', 'form', 'select', 'video', 'audio', 'canvas'])
const VOID = new Set(['img', 'br', 'hr', 'input', 'meta', 'link', 'source', 'wbr', 'area', 'base', 'col', 'embed', 'track'])
const BLOCK = new Set([
  'p', 'div', 'section', 'article', 'header', 'footer', 'aside', 'main', 'ul', 'ol', 'dl', 'dt', 'dd', 'table', 'tr',
  'blockquote', 'figure', 'figcaption', 'details', 'summary', 'address', 'pre',
])

const ENTITIES: Record<string, string> = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', rarr: '→', larr: '←', middot: '·', copy: '©' }

export function decodeEntities(text: string): string {
  return text.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (whole, code: string) => {
    if (code[0] === '#') {
      const point = code[1].toLowerCase() === 'x' ? parseInt(code.slice(2), 16) : parseInt(code.slice(1), 10)
      return Number.isFinite(point) ? String.fromCodePoint(point) : whole
    }
    return ENTITIES[code.toLowerCase()] ?? whole
  })
}

function attribute(attrs: string, name: string): string | undefined {
  const match = attrs.match(new RegExp(`(?:^|\\s)${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)')`, 'i'))
  return match ? decodeEntities(match[1] ?? match[2] ?? '') : undefined
}

/** The text between `<main>` and `</main>`, or the whole body when there is no main */
function mainOf(html: string): string {
  const start = html.search(/<main\b/i)
  const end = html.lastIndexOf('</main>')
  if (start >= 0 && end > start) return html.slice(start, end)
  const body = html.search(/<body\b/i)
  return body >= 0 ? html.slice(body) : html
}

export function htmlToMarkdown(html: string, origin: string): string {
  const source = mainOf(html).replace(/<!--[\s\S]*?-->/g, '')
  const tokens = /<(\/?)([a-zA-Z][a-zA-Z0-9]*)((?:"[^"]*"|'[^']*'|[^>"'])*)>|([^<]+)/g

  let out = ''
  // Open tags, so a close tag can be matched to the element it ends
  const open: { tag: string; skipped: boolean; linkAt?: number; href?: string }[] = []
  let skipping = 0

  for (let token = tokens.exec(source); token; token = tokens.exec(source)) {
    const [, closing, rawTag, attrs = '', text] = token

    if (text !== undefined) {
      if (!skipping) out += decodeEntities(text).replace(/\s+/g, ' ')
      continue
    }

    const tag = rawTag.toLowerCase()

    if (!closing) {
      const hidden = SKIPPED.has(tag) || attribute(attrs, 'aria-hidden') === 'true' || /(?:^|\s)hidden(?:\s|=|$)/i.test(attrs)
      if (VOID.has(tag) || /\/\s*$/.test(attrs)) {
        if (skipping || hidden) continue
        // A line break inside a heading would cut the heading in two
        if (tag === 'br') out += open.some((el) => /^h[1-6]$/.test(el.tag)) ? ' ' : '\n'
        else if (tag === 'hr') out += '\n\n---\n\n'
        else if (tag === 'img') {
          // Only a linked image says something an agent needs: where the link goes
          const alt = attribute(attrs, 'alt')
          if (alt && open.some((el) => el.tag === 'a')) out += alt
        }
        continue
      }

      open.push({ tag, skipped: hidden })
      if (hidden) skipping += 1
      if (skipping) continue

      if (/^h[1-6]$/.test(tag)) out += `\n\n${'#'.repeat(Number(tag[1]))} `
      else if (tag === 'li') out += '\n- '
      else if (BLOCK.has(tag)) out += '\n\n'
      else if (tag === 'strong' || tag === 'b') out += '**'
      else if (tag === 'em' || tag === 'i') out += '*'
      else if (tag === 'code') out += '`'
      else if (tag === 'a') {
        const element = open[open.length - 1]
        element.linkAt = out.length
        element.href = attribute(attrs, 'href')
      }
      continue
    }

    // A close tag ends the nearest open element of that name
    let index = open.length - 1
    while (index >= 0 && open[index].tag !== tag) index -= 1
    if (index < 0) continue
    const closed = open.splice(index)
    const element = closed[0]
    const wasSkipping = skipping > 0
    skipping -= closed.filter((el) => el.skipped).length
    if (wasSkipping) continue

    if (/^h[1-6]$/.test(tag) || BLOCK.has(tag) || tag === 'li') out += '\n\n'
    else if (tag === 'strong' || tag === 'b') out += '**'
    else if (tag === 'em' || tag === 'i') out += '*'
    else if (tag === 'code') out += '`'
    else if (tag === 'a' && element.linkAt !== undefined) {
      const label = out.slice(element.linkAt).replace(/\s+/g, ' ').trim()
      const href = element.href
      out = out.slice(0, element.linkAt)
      if (!label) continue
      if (!href || href.startsWith('#') || href.startsWith('javascript:')) out += label
      else out += `[${label}](${href.startsWith('/') ? origin + href : href}) `
    }
  }

  // Tidy: one blank line between blocks, no empty emphasis, and each block once
  // (carousels and marquees repeat their content so they can loop)
  const seen = new Set<string>()
  const blocks: string[] = []
  for (const raw of out.split(/\n{2,}/)) {
    const block = raw
      .split('\n')
      .map((line) => line.replace(/[ \t]+/g, ' ').trim())
      .filter((line) => line && line !== '-')
      .join('\n')
      .replace(/\*\*\s*\*\*|(?<!\*)\*\s*\*(?!\*)|``/g, '')
      .trim()
    if (!block || /^#{1,6}$/.test(block)) continue
    if (block.length > 24 && seen.has(block)) continue
    seen.add(block)
    blocks.push(block)
  }

  // List items are single-line blocks: put neighbours back into one list
  return blocks
    .join('\n\n')
    .replace(/(^|\n)(- [^\n]*)\n\n(?=- )/g, '$1$2\n')
    .trim()
}

/** Title, description and canonical address from the page's head */
export function pageFacts(html: string): { title?: string; description?: string; canonical?: string } {
  const head = html.slice(0, html.search(/<\/head>/i) >>> 0)
  const title = head.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1]
  const description = head.match(/<meta[^>]*name="description"[^>]*>/i)?.[0]
  const canonical = head.match(/<link[^>]*rel="canonical"[^>]*>/i)?.[0]
  return {
    title: title ? decodeEntities(title).trim() : undefined,
    description: description ? attribute(description, 'content') : undefined,
    canonical: canonical ? attribute(canonical, 'href') : undefined,
  }
}
