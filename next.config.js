/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['hebbkx1anhila5yf.public.blob.vercel-storage.com','res.cloudinary.com','randomuser.me'],
  },
  typescript: {
    // !! WARN !!
    // Ignoring build errors for now - must fix later
    // !! WARN !!
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig; 
