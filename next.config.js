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

const publicAssetFolders = ['images', 'logos', 'brand', 'favicons', 'guides', 'links', 'gsoc1', 'orientation-2026', 'reports']

const nextConfig = {
  poweredByHeader: false,
  images: {
    remotePatterns: [
      'hebbkx1anhila5yf.public.blob.vercel-storage.com',
      'res.cloudinary.com',
      'randomuser.me',
      'cdn.brandfetch.io',
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
  async headers() {
    return [
      ...publicAssetFolders.map((folder) => ({
        source: `/${folder}/:path*`,
        headers: publicAssetCache,
      })),
      {
        source: '/:file(og-image.jpg|favicon.ico|apple-touch-icon.png|icon-192.png|icon-512.png)',
        headers: publicAssetCache,
      },
    ]
  },
}

module.exports = nextConfig
