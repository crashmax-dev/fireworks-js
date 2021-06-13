const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const pkg = require('./package.json')
const outputPath = path.resolve(__dirname, 'dist')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const banner = `${pkg.name} ${pkg.version} by ${pkg.author.name} (${pkg.author.url})
${pkg.homepage}
License ${pkg.license}`

module.exports = {
  mode: process.env.NODE_ENV,
  target: 'web',
  entry: path.join(__dirname, 'src/fireworks.ts'),
  output: {
    path: outputPath,
    filename: 'fireworks.js',
    libraryTarget: 'umd',
    globalObject: 'this'
  },
  devServer: {
    https: true,
    port: 8080,
    writeToDisk: true,
    contentBase: outputPath
  },
  optimization: {
    minimize: true
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    targets: {
                      esmodules: true
                    }
                  }
                ]
              ]
            }
          },
          {
            loader: 'ts-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.BannerPlugin(banner),
    new webpack.DefinePlugin({
      version: JSON.stringify(pkg.version)
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'public',
          to: outputPath
        }
      ]
    })
  ]
}