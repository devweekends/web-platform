import { NextResponse } from 'next/server'

export function GET() {
  const body = `# Dev Weekends
> Dev Weekends is a learning community for software engineers with events, mentorship, projects, and career growth programs.

Canonical: https://devweekends.com
Sitemap: https://devweekends.com/sitemap.xml
Robots: https://devweekends.com/robots.txt

## Primary Pages
- Home: https://devweekends.com/
- About: https://devweekends.com/about
- Sessions: https://devweekends.com/sessions
- Community: https://devweekends.com/community
- Projects: https://devweekends.com/projects
- Mentorship: https://devweekends.com/mentorship
- Careers: https://devweekends.com/careers

## Machine-Readable Discovery
- API Catalog (RFC 9727): https://devweekends.com/.well-known/api-catalog
- OpenAPI: https://devweekends.com/openapi.json
- API Health: https://devweekends.com/api/health
- Agent Skills Index: https://devweekends.com/.well-known/agent-skills/index.json

## Content Preferences
- Content-Signal: ai-train=no, search=yes, ai-input=no
`

  return new NextResponse(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  })
}
