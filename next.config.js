/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'raw.githubusercontent.com',
      'cdn.jsdelivr.net',
      'upload.wikimedia.org'
    ],
  },
};


module.exports = nextConfig;
