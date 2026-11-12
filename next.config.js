/** @type {import('next').NextConfig} */

// Static files in /public are served with max-age=0 by default, so every
// repeat visit revalidates them. A day of browser cache plus a week of
// stale-while-revalidate keeps updates fast to ship and repeat views fast.
const publicAssetCache = [
  {
    key: 'Cache-Control',
    value: 'public, max-age=86400, stale-while-revalidate=604800',
  },
]

// Images, logos and brand marks in /public get a month, including when they are
// served resized by the image optimizer (it passes this lifetime on). A file
// that is replaced should take a new name, or visitors keep the old one.
const brandAssetCache = [
  {
    key: 'Cache-Control',
    value: 'public, max-age=2592000, stale-while-revalidate=31536000',
  },
]

const brandAssetFolders = ['logos', 'brand', 'favicons', 'images', 'guides', 'links', 'gsoc1', 'orientation-2026', 'reports']

// Only files, by extension. Several of these folders share their name with a
// page (/brand, /guides, /links, /reports), and a page must never be kept in
// the browser for a month.
const staticFile = ':file(.*\\.(?:png|jpe?g|gif|webp|avif|svg|ico|pdf|woff2?|mp4|webm))'

// Sent with every response. The script rules stay open because a strict
// script policy needs a per-request nonce, which would stop pages being
// served as static HTML from the edge. These directives are the ones that hold
// without it: who may frame the site, where <base> may point, and no plugins.
const securityHeaders = [
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
  { key: 'Content-Security-Policy', value: "frame-ancestors 'self'; base-uri 'self'; object-src 'none'; upgrade-insecure-requests" },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin-allow-popups' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
]

// Where agents can find the API description and the Markdown index
const discoveryLinkHeader = [
  '</.well-known/api-catalog>; rel="api-catalog"',
  '</openapi.json>; rel="service-desc"; type="application/openapi+json"',
  '</api-docs>; rel="service-doc"; type="text/html"',
  '</.well-known/agent-skills/index.json>; rel="describedby"; type="application/json"',
  '</llms.txt>; rel="alternate"; type="text/plain"',
].join(', ')

const nextConfig = {
  poweredByHeader: false,
  // The Markdown-for-agents route reads posts and guides at request time
  outputFileTracingIncludes: {
    '/agent-markdown': ['./content/blog/**/*.md', './content/guides/**/*.md'],
    '/llms-full.txt': ['./content/blog/**/*.md', './content/guides/**/*.md'],
  },
  images: {
    remotePatterns: [
      'hebbkx1anhila5yf.public.blob.vercel-storage.com',
      'res.cloudinary.com',
      'randomuser.me',
      'cdn.brandfetch.io',
      // Video story thumbnails
      'img.youtube.com',
    ].map((hostname) => ({ protocol: 'https', hostname })),
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  typescript: {
    // !! WARN !!
    // Ignoring build errors for now - must fix later
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      // About and Our story are now one page
      { source: '/about', destination: '/team', permanent: true },
      { source: '/our-story', destination: '/team', permanent: true },
    ]
  },
  async headers() {
    return [
      { source: '/:path*', headers: securityHeaders },
      { source: '/team', headers: [{ key: 'Link', value: discoveryLinkHeader }] },
      ...brandAssetFolders.map((folder) => ({
        source: `/${folder}/${staticFile}`,
        headers: brandAssetCache,
      })),
      {
        source: '/:file(og-image.jpg|favicon.ico|apple-touch-icon.png|icon-192.png|icon-512.png)',
        headers: publicAssetCache,
      },
    ]
  },
}

module.exports = nextConfig
