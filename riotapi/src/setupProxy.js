const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/lol',
    createProxyMiddleware({
      target: 'https://na1.api.riotgames.com',
      changeOrigin: true,
    })
  );
};
