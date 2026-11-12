import { NextResponse } from 'next/server'

import { CONTENT_SIGNAL, SITE_URL } from '@/lib/seo'

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

// The content signal belongs inside a group: a line outside any group is ignored
function group(agent: string) {
  return [
    `User-agent: ${agent}`,
    `Content-Signal: ${CONTENT_SIGNAL}`,
    'Allow: /',
    ...blocked.map((path) => `Disallow: ${path}`),
  ].join('\n')
}

export function GET() {
  const body = `${['*', 'GPTBot', 'ClaudeBot', 'PerplexityBot'].map(group).join('\n\n')}

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
