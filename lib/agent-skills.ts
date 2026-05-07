import { createHash } from 'node:crypto'

type SkillSeed = {
  name: string
  description: string
  content: string
}

export type PublishedSkill = {
  name: string
  type: 'skill-md'
  description: string
  url: string
  digest: string
  content: string
}

const skillSeeds: SkillSeed[] = [
  {
    name: 'devweekends-public-api',
    description:
      'Discover and use Dev Weekends public API endpoints, schema, health, and API catalog resources.',
    content: `---
name: devweekends-public-api
description: Discover and use Dev Weekends public API endpoints, schema, health, and API catalog resources.
---

# Dev Weekends Public API

Use this skill when you need machine-readable API discovery data or reliable service metadata for Dev Weekends.

## Discovery endpoints

- API catalog: \`/.well-known/api-catalog\`
- OpenAPI description: \`/openapi.json\`
- API health endpoint: \`/api/health\`
- Human API docs: \`/api-docs\`

## Usage guidance

1. Fetch \`/.well-known/api-catalog\` first to discover service relations.
2. Read \`/openapi.json\` for endpoint and schema details.
3. Check \`/api/health\` before long-running API workflows.
`,
  },
  {
    name: 'devweekends-ai-content-policy',
    description:
      'Apply and verify Dev Weekends AI content usage preferences declared in robots Content-Signal directives.',
    content: `---
name: devweekends-ai-content-policy
description: Apply and verify Dev Weekends AI content usage preferences declared in robots Content-Signal directives.
---

# Dev Weekends AI Content Policy

Use this skill when you need to verify or reason about Dev Weekends AI usage preferences for crawlers and model providers.

## Policy source

- robots policy endpoint: \`/robots.txt\`
- Content-Signal directive: \`ai-train=no, search=yes, ai-input=no\`

## Validation checklist

1. Fetch \`/robots.txt\`.
2. Confirm the \`Content-Signal\` directive is present.
3. Ensure crawlers can read the file without authentication.
`,
  },
]

function sha256Hex(input: string): string {
  return createHash('sha256').update(Buffer.from(input, 'utf8')).digest('hex')
}

export const publishedSkills: PublishedSkill[] = skillSeeds.map((skill) => ({
  name: skill.name,
  type: 'skill-md',
  description: skill.description,
  url: `/.well-known/agent-skills/${skill.name}/SKILL.md`,
  digest: `sha256:${sha256Hex(skill.content)}`,
  content: skill.content,
}))

export function getPublishedSkill(name: string): PublishedSkill | undefined {
  return publishedSkills.find((skill) => skill.name === name)
}
