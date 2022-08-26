const PROXY_CONFIG = [
  {
    context: ['/v1'],
    target: 'https://api.giphy.com',
    changeOrigin: true,
    secure: true
  },
  {
    context: ['/v2/upload'],
    target: 'https://upload.giphy.com',
    changeOrigin: true,
    secure: true,
    pathRewrite: {
      '^/v2/upload': '/v1/gifs'
    }
  },
  {
    context: ['/v4'],
    target: 'https://giphy.com/api',
    changeOrigin: true,
    secure: true
  }
];

module.exports = PROXY_CONFIG;
