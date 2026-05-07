import { NextRequest, NextResponse } from 'next/server'

export function GET(request: NextRequest) {
  const origin = request.nextUrl.origin

  const spec = {
    openapi: '3.0.3',
    info: {
      title: 'Dev Weekends API',
      version: '1.0.0',
      description: 'Public API surface for Dev Weekends.',
    },
    servers: [
      {
        url: origin,
      },
    ],
    paths: {
      '/api/health': {
        get: {
          summary: 'Health check',
          responses: {
            '200': {
              description: 'API is healthy',
            },
          },
        },
      },
    },
  }

  return NextResponse.json(spec, {
    headers: {
      'Content-Type': 'application/openapi+json; charset=utf-8',
    },
  })
}
