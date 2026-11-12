import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { NextResponse } from 'next/server'

import { SITE_URL } from '@/lib/seo'

/** Posts or guides as Markdown links, newest first, with their own descriptions */
function contentLinks(folder: 'blog' | 'guides'): string {
  const dir = path.join(process.cwd(), 'content', folder)
  if (!fs.existsSync(dir)) return ''
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith('.md'))
    .map((file) => ({ slug: file.replace(/\.md$/, ''), data: matter(fs.readFileSync(path.join(dir, file), 'utf8')).data }))
    .filter(({ data }) => data.draft !== true && data.title)
    .sort((a, b) => new Date(b.data.date ?? 0).getTime() - new Date(a.data.date ?? 0).getTime())
    .map(({ slug, data }) => `- [${data.title}](${SITE_URL}/${folder}/${slug})${data.description ? `: ${data.description}` : ''}`)
    .join('\n')
}

// The longer index for language models: what Dev Weekends is, every public
// page with a line on what it holds, and all posts and guides.
export function GET() {
  const body = `# Dev Weekends

> Dev Weekends is a free, nonprofit community of engineers founded in 2018, with programs, mentorship, open source and partnerships that open doors to the world.

Everything Dev Weekends runs is free for members. Any page below can be read as Markdown by asking for it with the header \`Accept: text/markdown\`. Content signals for this site: ai-train=no, search=yes, ai-input=no.

## About

- [Home](${SITE_URL}/): What Dev Weekends is, its reach in numbers, programs and partners
- [Team and story](${SITE_URL}/team): The people behind Dev Weekends, and how weekend sessions in 2018 became a free community of 30,000+ engineers
- [Community](${SITE_URL}/community): Discord, WhatsApp groups and live sessions, and how to join
- [Links](${SITE_URL}/links): The community groups: competitive programming, open source, placements, tech stacks and events
- [Testimonials](${SITE_URL}/testimonials): Members describing what changed for them
- [Feed](${SITE_URL}/feed): Milestones and builds members share on LinkedIn with #DevWeekends
- [Brand](${SITE_URL}/brand): Logos and the official session slide template

## Programs

- [Fellowship](${SITE_URL}/fellowship): The 2026 fellowship and its impact report
- [Fellowship 2025](${SITE_URL}/fellowship/2025): Results of the 2025 summer fellowship
- [Mentorship](${SITE_URL}/mentorship): A free 3-month program with a personal mentor, live coding sessions and job preparation
- [DSOC](${SITE_URL}/dsoc): Dev Weekends Summer of Code, a mentored open source program with a stipend per milestone
- [DSOC projects](${SITE_URL}/dsoc/projects): The open source projects in DSOC
- [DWOSI](${SITE_URL}/dwosi): The open source initiative, where contributors build live products and every pull request is reviewed by maintainers
- [FYP Roadshow](${SITE_URL}/fyp-roadshow): Practical guidance for final-year students choosing, planning and building a final year project
- [Ambassador program](${SITE_URL}/ambassador-program): Leading Dev Weekends on a university campus
- [Ambassadors](${SITE_URL}/ambassadors): The people who represent and grow the community around the world
- [Sessions](${SITE_URL}/sessions): Past and upcoming talks and workshops
- [Projects](${SITE_URL}/projects): Projects built by members
- [Partners](${SITE_URL}/partners): The organisations and communities working with Dev Weekends
- [Network](${SITE_URL}/network): Mentors and mentees and how they connect

## Blog

${contentLinks('blog')}

## Guides

${contentLinks('guides')}

## Machine-readable discovery

- [Short index](${SITE_URL}/llms.txt): The short version of this file
- [Sitemap](${SITE_URL}/sitemap.xml): Every public URL
- [API catalog](${SITE_URL}/.well-known/api-catalog): RFC 9727 list of the public APIs
- [OpenAPI description](${SITE_URL}/openapi.json): Schema of the public API
- [API documentation](${SITE_URL}/api-docs): The public API explained
- [Agent skills index](${SITE_URL}/.well-known/agent-skills/index.json): Skills an agent can use on this site
`

  return new NextResponse(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  })
}
