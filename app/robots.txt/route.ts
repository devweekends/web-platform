import { NextResponse } from 'next/server'

import { SITE_URL } from '@/lib/seo'

// Logins, dashboards and API routes have nothing to rank for
const blocked = [
  '/api/',
  '/admin/',
  '/mentor/',
  '/ambassador/',
  '/dsoc/mentor/',
  '/dsoc/mentee/',
  '/dsoc/applications/',
]

function group(agent: string) {
  return [`User-agent: ${agent}`, 'Allow: /', ...blocked.map((path) => `Disallow: ${path}`)].join('\n')
}

export function GET() {
  const body = `${['*', 'GPTBot', 'ClaudeBot', 'PerplexityBot'].map(group).join('\n\n')}

Content-Signal: ai-train=no, search=yes, ai-input=no
Host: ${SITE_URL}
Sitemap: ${SITE_URL}/sitemap.xml
`

  return new NextResponse(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  })
}
