import { NextResponse } from 'next/server'

export function GET() {
  const body = `# Dev Weekends
> Dev Weekends is a learning community for software engineers with events, mentorship, projects, and career growth programs.

Canonical: https://www.devweekends.com
Sitemap: https://www.devweekends.com/sitemap.xml
Robots: https://www.devweekends.com/robots.txt

## Primary Pages
- Home: https://www.devweekends.com/
- Team and story: https://www.devweekends.com/team
- Sessions: https://www.devweekends.com/sessions
- Community: https://www.devweekends.com/community
- Links: https://www.devweekends.com/links
- Projects: https://www.devweekends.com/projects
- Mentorship: https://www.devweekends.com/mentorship

## Machine-Readable Discovery
- API Catalog (RFC 9727): https://www.devweekends.com/.well-known/api-catalog
- OpenAPI: https://www.devweekends.com/openapi.json
- API Health: https://www.devweekends.com/api/health
- Agent Skills Index: https://www.devweekends.com/.well-known/agent-skills/index.json

## Content Preferences
- Content-Signal: ai-train=no, search=yes, ai-input=no
`

  return new NextResponse(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  })
}
