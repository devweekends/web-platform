// Writes lib/page-dates.json: for every page, the date its own source last
// changed, taken from git history. The sitemap uses these as <lastmod>, so a
// search engine is told a page changed only when it really did.
//
// Run:  node scripts/page-dates.mjs
// It needs the full git history. On a shallow clone it changes nothing, so the
// committed file stays as the fallback. The deploy workflow runs it on a full
// clone, so the live sitemap is always up to date.

import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

const OUT = 'lib/page-dates.json'
const git = (...args) => execFileSync('git', args, { encoding: 'utf8' }).trim()

if (git('rev-parse', '--is-shallow-repository') === 'true') {
  console.log('Shallow clone: page dates left as they are')
  process.exit(0)
}

// A page is made of the files in its own route folder. A few pages are mostly
// built from components that live elsewhere.
const EXTRA = {
  '/': ['components/home', 'components/site/start-here.tsx'],
  '/links': ['lib/links-data.ts'],
}

function routes(dir = 'app', found = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.posix.join(dir, entry.name)
    if (entry.isDirectory()) routes(full, found)
    else if (entry.name === 'page.tsx') found.push(dir)
  }
  return found
}

const dates = {}
for (const dir of routes()) {
  const route = dir.replace(/^app/, '') || '/'
  // Private areas, API routes and pages with a parameter are not in the sitemap
  if (/\[|^\/(admin|mentor|ambassador|api)(\/|$)/.test(route)) continue
  const own = fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => path.posix.join(dir, entry.name))
  const date = git('log', '-1', '--format=%cI', '--', ...own, ...(EXTRA[route] ?? []))
  if (date) dates[route] = date
}

const sorted = Object.fromEntries(Object.entries(dates).sort(([a], [b]) => a.localeCompare(b)))
fs.writeFileSync(OUT, `${JSON.stringify(sorted, null, 2)}\n`)
console.log(`Wrote ${Object.keys(sorted).length} page dates to ${OUT}`)
