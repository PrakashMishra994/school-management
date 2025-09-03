/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/school-management',   // <-- Repo name with '/' at start
  images: {
    unoptimized: true,
  },
};
 
module.exports = nextConfig;