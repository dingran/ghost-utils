// next.config.js
const withImages = require('next-images');

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
});

module.exports = withMDX(
  withImages({
    fileExtensions: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
    pageExtensions: ['js', 'jsx', 'mdx'],
    webpack(config, options) {
      return config;
    },
    async headers() {
      return [
        {
          // matching all API routes
          source: '/api/:path*',
          headers: [
            { key: 'Access-Control-Allow-Credentials', value: 'true' },
            { key: 'Access-Control-Allow-Origin', value: '*' },
            {
              key: 'Access-Control-Allow-Methods',
              value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
            },
            {
              key: 'Access-Control-Allow-Headers',
              value:
                'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
            },
          ],
        },
      ];
    },
  })
);
