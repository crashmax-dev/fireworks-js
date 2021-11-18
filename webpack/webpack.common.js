const { DefinePlugin } = require('webpack')
const { paths, version } = require('./webpack.config')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

/** @type {import('webpack').Configuration} */
module.exports = {
  entry: paths.entry,
  output: {
    path: paths.output,
    filename: '[name].js',
    libraryTarget: 'umd',
    globalObject: 'this',
    // library: 'Fireworks',
    // libraryExport: 'default',
    umdNamedDefine: true
  },
  externals: {
    './fireworks': './fireworks',
    react: 'react'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
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
  resolve: {
    extensions: ['.ts', '.js']
  },
  performance: {
    hints: false
  },
  plugins: [
    new CleanWebpackPlugin(),
    new DefinePlugin({ version })
  ]
}