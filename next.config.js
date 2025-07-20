/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // 禁用图片优化，直接使用原始图片
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.hunlihu.com',
        port: '',
        pathname: '/userphoto/**',
      },
      {
        protocol: 'https',
        hostname: 'h.hunlihu.com',
        port: '',
        pathname: '/sysma/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'react-icons'],
  },
}

module.exports = nextConfig 