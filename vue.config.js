module.exports = {
  publicPath: "./",
  devServer: {
    proxy: {
      '/api': {
        // 实际代理的地址
        target: 'http://localhost:8080/',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
