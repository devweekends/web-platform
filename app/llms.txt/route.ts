import { NextResponse } from 'next/server'

// Follows the llms.txt format: a title, a one-line summary, then sections of
// Markdown links, each with a short note on what the page is for.
export function GET() {
  const body = `# Dev Weekends

> Dev Weekends is a free community of engineers with programs, mentorship, open source and partnerships that open doors to the world.

Every public page is also available as Markdown: request it with the header \`Accept: text/markdown\`. Content signals for this site: ai-train=no, search=yes, ai-input=no.

## Primary pages

- [Home](https://www.devweekends.com/): What Dev Weekends is, its reach, programs and partners
- [Team and story](https://www.devweekends.com/team): Who runs Dev Weekends and how it started
- [Fellowship](https://www.devweekends.com/fellowship): The engineering fellowship and how to apply
- [Mentorship](https://www.devweekends.com/mentorship): One to one and group mentorship
- [DWOSI](https://www.devweekends.com/dwosi): The open source initiative
- [Sessions](https://www.devweekends.com/sessions): Past and upcoming talks and workshops
- [Community](https://www.devweekends.com/community): Where members meet and how to join
- [Partners](https://www.devweekends.com/partners): Companies, universities and communities working with Dev Weekends
- [Projects](https://www.devweekends.com/projects): Projects built by members
- [Blog](https://www.devweekends.com/blog): News, guides and articles

## Machine-readable discovery

- [Full text for language models](https://www.devweekends.com/llms-full.txt): A longer single-file description of the site
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
