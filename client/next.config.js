/** @type {import('next').NextConfig} */


module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:slug*',
        destination: 'http://localhost:3001/api/:slug*' // Proxy to Backend
      }
    ]
  }
}



// const nextConfig = {
//   reactStrictMode: true,
// }

// module.exports = nextConfig
