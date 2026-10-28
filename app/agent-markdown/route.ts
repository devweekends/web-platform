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

- Website: https://www.devweekends.com
- Sessions: https://www.devweekends.com/sessions
- Community: https://www.devweekends.com/community
- Mentorship: https://www.devweekends.com/mentorship
- Projects: https://www.devweekends.com/projects

## Agent and machine-readable discovery

- Requested path: ${sourcePath}
- llms.txt: https://www.devweekends.com/llms.txt
- API catalog: https://www.devweekends.com/.well-known/api-catalog
- Agent skills index: https://www.devweekends.com/.well-known/agent-skills/index.json
`

  return new NextResponse(markdown, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'x-markdown-tokens': String(estimateTokenCount(markdown)),
    },
  })
}
