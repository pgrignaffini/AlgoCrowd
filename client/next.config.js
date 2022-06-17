/** @type {import('next').NextConfig} */


module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:slug*',
        destination: 'http://stormy-sea-92917.herokuapp.com/api/:slug*' // Proxy to Backend
      }
    ]
  }
}



// const nextConfig = {
//   reactStrictMode: true,
// }

// module.exports = nextConfig
