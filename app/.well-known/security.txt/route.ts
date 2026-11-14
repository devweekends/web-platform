import { SITE_URL } from '@/lib/seo'

// Built with the site, so the expiry date moves forward with every deploy
export const dynamic = 'force-static'

/**
 * Where to report a security problem (RFC 9116). The address is the one
 * SECURITY.md in the repository already gives. The file must carry an expiry
 * date less than a year away.
 */
export function GET() {
  const expires = new Date(Date.now() + 364 * 24 * 60 * 60 * 1000)
  expires.setUTCHours(0, 0, 0, 0)

  const body = `Contact: mailto:info@devweekends.com
Expires: ${expires.toISOString()}
Preferred-Languages: en
Canonical: ${SITE_URL}/.well-known/security.txt
Policy: https://github.com/devweekends/web-platform/blob/main/SECURITY.md
`

  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
