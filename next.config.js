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
  },
  env: {
    'MONGODB_URI': "mongodb+srv://tiptop-orlandolukic:1UaFdEMgLJYNIcNJ@tiptopcluster.2dgys.mongodb.net/tiptopdb?retryWrites=true&w=majority",
    'MONGODB_NAME': 'tiptopdb',
    "MONGODB_USERNAME": "tiptop-orlandolukic",
    "MONGODB_PASSWORD": "1UaFdEMgLJYNIcNJ",
    'JWT_KEY': `sdflkjSJlkfjgei3098!ejhr@#*(&#$*_JHNMNDIIKKWO9808DF32ASD?_)dsfj(O*kdfdnW&&&df9JSD(*#$&*))sd!@@@#@##$FDCSVP:OIOPQOP!(*@#1eahnj8734f;lkjgvjor57jdIOPW&AEREnmflaty:LSAJfhjkldhwuoreOuqophjklargou-0834857)`
  }   
}

module.exports = nextConfig
