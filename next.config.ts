import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: "standalone",
    images: {
      domains: ['hebbkx1anhila5yf.public.blob.vercel-storage.com','res.cloudinary.com','randomuser.me'],
    },

};

export default nextConfig;
