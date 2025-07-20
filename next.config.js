/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ai-public.mastergo.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.hunlihu.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'h.hunlihu.com',
        port: '',
        pathname: '/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'react-icons'],
  },
}

module.exports = nextConfig 