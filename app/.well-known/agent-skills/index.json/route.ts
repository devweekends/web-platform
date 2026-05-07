import { NextResponse } from 'next/server'
import { publishedSkills } from '@/lib/agent-skills'

const schemaUrl = 'https://schemas.agentskills.io/discovery/0.2.0/schema.json'

function buildIndexBody() {
  return {
    $schema: schemaUrl,
    skills: publishedSkills.map(({ name, type, description, url, digest }) => ({
      name,
      type,
      description,
      url,
      digest,
    })),
  }
}

export function GET() {
  return NextResponse.json(buildIndexBody(), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  })
}

export function HEAD() {
  return new NextResponse(null, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  })
}
