import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  eslint: {
    // Pre-existing lint issues in UI components; lint separately via `pnpm lint`
    ignoreDuringBuilds: true,
  },
  experimental: {
    // ppr: true,
  },
}

export default nextConfig
