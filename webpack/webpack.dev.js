const { merge } = require('webpack-merge')
const common = require('./webpack.common')
const { port, paths } = require('./webpack.config')

/** @type {import('webpack').Configuration} */
module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    port,
    open: true,
    compress: true,
    devMiddleware: {
      writeToDisk: true
    },
    static: [
      paths.public
    ]
  }
})