import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  reactStrictMode: true,
  eslint: {
    // Avoid blocking production builds on lint errors during migration
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Avoid blocking production builds on type errors during migration
    ignoreBuildErrors: true,
  },
}

export default nextConfig


