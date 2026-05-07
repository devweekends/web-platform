import { NextRequest, NextResponse } from 'next/server'

export function GET(request: NextRequest) {
  const origin = request.nextUrl.origin
  const apiBase = `${origin}/api`

  const body = {
    linkset: [
      {
        anchor: apiBase,
        'service-desc': [
          {
            href: `${origin}/openapi.json`,
            type: 'application/openapi+json',
          },
        ],
        'service-doc': [
          {
            href: `${origin}/api-docs`,
            type: 'text/html',
          },
        ],
        status: [
          {
            href: `${apiBase}/health`,
            type: 'application/json',
          },
        ],
      },
    ],
  }

  return NextResponse.json(body, {
    headers: {
      'Content-Type': 'application/linkset+json; charset=utf-8',
    },
  })
}
