/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['i.imgur.com'],
    unoptimized: true,
  },
  trailingSlash: true,
  poweredByHeader: false,
  compress: true,
  reactStrictMode: false,
}

module.exports = nextConfig 