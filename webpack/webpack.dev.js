const { merge } = require('webpack-merge')
const common = require('./webpack.common')
const { port, paths } = require('./webpack.config')
const { HotModuleReplacementPlugin } = require('webpack')

/** @type {import('webpack').Configuration} */
module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    port,
    open: true,
    compress: true,
    static: [
      paths.public
    ]
  },
  plugins: [
    new HotModuleReplacementPlugin()
  ]
})