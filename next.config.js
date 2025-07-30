/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // <- this enables static HTML export
  basePath: '/Siddu-s-3D-World', // <- repo name for GitHub Pages
  images: {
    unoptimized: true // Optional: avoids Next.js Image optimization issues
  }
}

module.exports = nextConfig;
