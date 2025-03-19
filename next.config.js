/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'images.unsplash.com',
      'source.unsplash.com',
      'randomuser.me'
    ],
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    return [
      {
        // Konfigurasi CORS global untuk semua API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization" },
        ]
      }
    ];
  },
  // Mendengarkan dari semua interface jaringan
  serverRuntimeConfig: {
    hostname: '0.0.0.0'
  }
};

module.exports = nextConfig;