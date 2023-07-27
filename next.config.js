/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['api.readyplayer.me'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.readyplayer.me',
        port: '',
        pathname: '/v1/avatars/**',
      },
    ],
  },
};

module.exports = nextConfig;
