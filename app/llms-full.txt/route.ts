import { NextResponse } from 'next/server'

export function GET() {
  const body = `# Dev Weekends - Extended LLM Index

## Organization
Name: Dev Weekends
Website: https://www.devweekends.com
Description: Community-driven software engineering education through weekend sessions, mentorship, project building, and tech initiatives.

## Public Website URLs
- https://www.devweekends.com/
- https://www.devweekends.com/team
- https://www.devweekends.com/community
- https://www.devweekends.com/sessions
- https://www.devweekends.com/projects
- https://www.devweekends.com/mentorship
- https://www.devweekends.com/mentor
- https://www.devweekends.com/testimonials
- https://www.devweekends.com/ambassadors
- https://www.devweekends.com/ambassador-program
- https://www.devweekends.com/fellowship
- https://www.devweekends.com/network

## Program URLs
- https://www.devweekends.com/dsoc
- https://www.devweekends.com/dsoc/projects
- https://www.devweekends.com/dsoc/register

## Discovery and Interoperability
- robots.txt: https://www.devweekends.com/robots.txt
- sitemap.xml: https://www.devweekends.com/sitemap.xml
- llms.txt: https://www.devweekends.com/llms.txt
- API Catalog: https://www.devweekends.com/.well-known/api-catalog
- OpenAPI: https://www.devweekends.com/openapi.json
- API Documentation: https://www.devweekends.com/api-docs
- API Health: https://www.devweekends.com/api/health
- Agent Skills Index: https://www.devweekends.com/.well-known/agent-skills/index.json

## AI Preferences
Content-Signal: ai-train=no, search=yes, ai-input=no
`

  return new NextResponse(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  })
}
