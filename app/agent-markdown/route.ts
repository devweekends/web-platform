import { NextRequest, NextResponse } from 'next/server'

function estimateTokenCount(markdown: string): number {
  return Math.max(1, Math.ceil(markdown.length / 4))
}

export function GET(request: NextRequest) {
  const sourcePath = request.nextUrl.searchParams.get('source') || '/'

  const markdown = `# Dev Weekends

Dev Weekends (DW) is Pakistan's number 1 software engineering community for students and early-career developers who want to grow fast with practical, real-world learning.

## What Dev Weekends is

- A community-first learning platform focused on software engineering and career growth.
- A place where developers learn by building, shipping, and getting feedback from mentors.
- A support system for people preparing for internships, jobs, freelancing, and global remote work.

## How we work

1. Weekly and weekend sessions led by industry professionals.
2. Mentorship tracks with focused guidance and accountability.
3. Community projects and open-source collaboration.
4. Career support through interview prep, networking, and role-based guidance.

## Accessibility and cost

Everything at Dev Weekends is free for the community. Our core mission is to make high-quality tech mentorship and learning accessible for everyone.

## Primary links

- Website: https://devweekends.com
- Sessions: https://devweekends.com/sessions
- Community: https://devweekends.com/community
- Mentorship: https://devweekends.com/mentorship
- Projects: https://devweekends.com/projects

## Agent and machine-readable discovery

- Requested path: ${sourcePath}
- llms.txt: https://devweekends.com/llms.txt
- API catalog: https://devweekends.com/.well-known/api-catalog
- Agent skills index: https://devweekends.com/.well-known/agent-skills/index.json
`

  return new NextResponse(markdown, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'x-markdown-tokens': String(estimateTokenCount(markdown)),
    },
  })
}
