/** @type {import('next').NextConfig} */

const path = require('path');

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
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')]    
  }    
}

module.exports = nextConfig
