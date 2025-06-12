const withNextIntl = require('next-intl/plugin')('./i18n.js');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [],
  },
  // PWA Configuration
  async headers() {
    return [
      {
        source: '/sw.js',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
          {
            key: 'Service-Worker-Allowed',
            value: '/',
          },
        ],
      },
      {
        source: '/manifest.json',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/service-worker.js',
        destination: '/sw.js',
      },
    ];
  },
  // Cloudflare Pages SPA 配置
  trailingSlash: false,
  images: {
    unoptimized: true,
  },
}

module.exports = withNextIntl(nextConfig);