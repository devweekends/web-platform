import { NextRequest, NextResponse } from 'next/server'
import { getPublishedSkill } from '@/lib/agent-skills'

type RouteParams = {
  params: Promise<{
    skill: string
  }>
}

export async function GET(_request: NextRequest, { params }: RouteParams) {
  const { skill } = await params
  const publishedSkill = getPublishedSkill(skill)

  if (!publishedSkill) {
    return NextResponse.json({ error: 'Skill not found' }, { status: 404 })
  }

  return new NextResponse(publishedSkill.content, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
    },
  })
}

export async function HEAD(_request: NextRequest, { params }: RouteParams) {
  const { skill } = await params
  const publishedSkill = getPublishedSkill(skill)

  if (!publishedSkill) {
    return new NextResponse(null, { status: 404 })
  }

  return new NextResponse(null, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
    },
  })
}
