import { NextResponse } from 'next/server'

import { CONTENT_SIGNAL } from '@/lib/seo'

// Follows the llms.txt format: a title, a one-line summary, then sections of
// Markdown links, each with a short note on what the page is for.
export function GET() {
  const body = `# Dev Weekends

> Dev Weekends is a free community of engineers with programs, mentorship, open source and partnerships that open doors to the world.

Every public page is also available as Markdown: request it with the header \`Accept: text/markdown\`. Content signals for this site: ${CONTENT_SIGNAL}. You may use these pages to answer questions and cite them; please do not train models on them.

## Primary pages

- [Home](https://www.devweekends.com/): What Dev Weekends is, its reach, programs and partners
- [Team and story](https://www.devweekends.com/team): The people behind Dev Weekends and how it started in 2018
- [Fellowship](https://www.devweekends.com/fellowship): The 2026 fellowship and its impact report
- [Mentorship](https://www.devweekends.com/mentorship): A free 3-month program with a personal mentor, live coding sessions and job preparation
- [DWOSI](https://www.devweekends.com/dwosi): The open source initiative
- [Sessions](https://www.devweekends.com/sessions): Past and upcoming talks and workshops
- [Community](https://www.devweekends.com/community): Discord, WhatsApp groups and live sessions, and how to join
- [Partners](https://www.devweekends.com/partners): The organisations and communities working with Dev Weekends
- [Projects](https://www.devweekends.com/projects): Projects built by members
- [Resources](https://resources.devweekends.com): The free learning hub on its own site: system design, low-level design, DSA patterns, AWS, AI engineering, operating systems, courses and case studies
- [Blog](https://www.devweekends.com/blog): News, guides and articles

## Machine-readable discovery

- [Longer index](https://www.devweekends.com/llms-full.txt): Every public page, post and guide with a line on each
- [Sitemap](https://www.devweekends.com/sitemap.xml): Every public URL
- [API catalog](https://www.devweekends.com/.well-known/api-catalog): RFC 9727 list of the public APIs
- [OpenAPI description](https://www.devweekends.com/openapi.json): Schema of the public API
- [Agent skills index](https://www.devweekends.com/.well-known/agent-skills/index.json): Skills an agent can use on this site

## Optional

- [Links](https://www.devweekends.com/links): All community and social links in one place
- [API health](https://www.devweekends.com/api/health): Health check of the public API
- [Robots](https://www.devweekends.com/robots.txt): Crawling rules
`

  return new NextResponse(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  })
}
