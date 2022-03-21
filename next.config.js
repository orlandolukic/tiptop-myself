/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,  
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      '/': { page: '/' },
      '/index': { page: '/' },
      '/home': { page: '/home' },
      '/collections': { page: '/collections' }
    }
  }  
}

module.exports = nextConfig
