import { NextResponse } from 'next/server'

export function GET() {
  const body = `# Dev Weekends - Extended LLM Index

## Organization
Name: Dev Weekends
Website: https://devweekends.com
Description: Community-driven software engineering education through weekend sessions, mentorship, project building, and tech initiatives.

## Public Website URLs
- https://devweekends.com/
- https://devweekends.com/about
- https://devweekends.com/our-story
- https://devweekends.com/community
- https://devweekends.com/sessions
- https://devweekends.com/projects
- https://devweekends.com/mentorship
- https://devweekends.com/mentor
- https://devweekends.com/testimonials
- https://devweekends.com/careers
- https://devweekends.com/ambassadors
- https://devweekends.com/ambassador-program
- https://devweekends.com/fellowship
- https://devweekends.com/network
- https://devweekends.com/mindmaster

## Program URLs
- https://devweekends.com/dsoc
- https://devweekends.com/dsoc/projects
- https://devweekends.com/dsoc/register

## Discovery and Interoperability
- robots.txt: https://devweekends.com/robots.txt
- sitemap.xml: https://devweekends.com/sitemap.xml
- llms.txt: https://devweekends.com/llms.txt
- API Catalog: https://devweekends.com/.well-known/api-catalog
- OpenAPI: https://devweekends.com/openapi.json
- API Documentation: https://devweekends.com/api-docs
- API Health: https://devweekends.com/api/health
- Agent Skills Index: https://devweekends.com/.well-known/agent-skills/index.json

## AI Preferences
Content-Signal: ai-train=no, search=yes, ai-input=no
`

  return new NextResponse(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  })
}
