const { createProxyMiddleware } = require('http-proxy-middleware');


module.exports = app => {
  app.use(
    "/apiss",
    createProxyMiddleware({
      target: "https://asia-east2-socialape-d6344.cloudfunctions.net",
      "changeOrigin": true
    })
  );
};