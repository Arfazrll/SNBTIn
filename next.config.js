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
};

module.exports = nextConfig;