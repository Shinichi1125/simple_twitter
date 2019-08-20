module.exports = {
  devServer: {
    host: '0.0.0.0',
    port: 3000,
    proxy: 'http://localhost:3001'
  }
};