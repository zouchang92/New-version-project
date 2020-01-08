const path = require('path')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css', 'svg']
const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/zhxyweb/' : '/',
  lintOnSave: false,
  configureWebpack: config => {
    if (isProduction) {
      config.plugins.push(new CompressionWebpackPlugin({
          algorithm: 'gzip',
          test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
          threshold: 1024,
          minRatio: 0.8
        })
      )
    }
  }
}