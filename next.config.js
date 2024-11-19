/** @type {import('next').NextConfig} */
const ContentSecurityPolicy = require('./csp');
const redirects = require('./redirects');

const allowedDomains = [
  process.env.NEXT_PUBLIC_PAYLOAD_URL,
  process.env.NEXT_PUBLIC_FRONTEND_URL,
  'https://api.mapbox.com',
  'https://events.mapbox.com',
  'https://*.tiles.mapbox.com',
  'https://events.mapbox.com/events/v2*',
  'https://*.mapbox.com',
  'https://cdn.plyr.io',
];

const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline' ${allowedDomains.join(' ')};
    style-src 'self' 'unsafe-inline' ${allowedDomains.join(' ')};
    img-src 'self' data: blob: ${allowedDomains.join(' ')};
    media-src 'self' blob: ${allowedDomains.join(' ')};
    frame-src 'self' ${allowedDomains.join(' ')};
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self' ${allowedDomains.join(' ')};
    frame-ancestors 'none';
    connect-src 'self' ${allowedDomains.join(' ')};
    worker-src 'self' blob:;
    upgrade-insecure-requests;
`
  .replace(/\s{2,}/g, ' ')
  .trim();

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname:
          process.env.NEXT_PUBLIC_SERVER_URL?.replace(/https?:\/\//, '') ||
          'localhost',
      },
    ],
  },
  redirects,
  async headers() {
    const headers = [];

    if (!process.env.NEXT_PUBLIC_IS_LIVE) {
      headers.push({
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex',
          },
        ],
        source: '/:path*',
      });
    }

    // Set the `Content-Security-Policy` header as a security measure to prevent XSS attacks
    // It works by explicitly whitelisting trusted sources of content for your website
    // This will block all inline scripts and styles except for those that are allowed
    headers.push({
      source: '/(.*)',
      headers: [
        {
          key: 'Content-Security-Policy',
          value: cspHeader.replace(/\n/g, ''),
        },
      ],
    });

    return headers;
  },
};

module.exports = nextConfig;
