/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["api.readyplayer.me"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.readyplayer.me",
        port: "",
        pathname: "/v1/avatars/**",
      },
    ],
  },
  env: {
    MAIL_SERVICE_ID: "service_d1zkcqc",
    MAIL_TEMPLATE_ID: "template_cr45tip",
    MAIL_USER_ID: "mZL0YZsa31vcuSh1K",
  },
};

module.exports = nextConfig;
