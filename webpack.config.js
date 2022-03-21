const path = require('path')
const webpack = require('webpack')
const CopyPlugin = require('copy-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const RemovePlugin = require('remove-files-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

const port = 8080
const { name, version, author, homepage, license } = require('./package.json')
const banner = `${name} ${version} by ${author.name} (${author.url})\n${homepage}\nLicense ${license}`

module.exports = (env, args) => ({
  mode: args.mode,
  entry: {
    index: './src/demo/index.ts',
    fireworks: './src/fireworks.ts',
    react: './src/react.ts'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    libraryTarget: 'umd',
    globalObject: 'this',
    umdNamedDefine: true
  },
  devtool: args.mode === 'development' ? 'source-map' : false,
  devServer: {
    port,
    open: true,
    compress: true,
    devMiddleware: {
      writeToDisk: true
    },
    static: {
      directory: path.resolve(__dirname, 'public')
    }
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
    extensions: [
      '.ts',
      '.js'
    ]
  },
  performance: {
    hints: false
  },
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin({
        extractComments: false
      })
    ]
  },
  plugins: [
    new webpack.BannerPlugin({ banner }),
    new webpack.DefinePlugin({
      version: JSON.stringify(version)
    }),
    new RemovePlugin({
      before: {
        log: false,
        include: [
          'dist'
        ]
      },
      after: {
        log: false,
        root: 'dist',
        include: [
          'demo',
          'explosion.d.ts',
          'helpers.d.ts',
          'sound.d.ts',
          'trace.d.ts'
        ]
      }
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'public'),
          to: path.resolve(__dirname, 'dist'),
          noErrorOnMissing: true,
          globOptions: {
            ignore: [
              '*.DS_Store'
            ]
          }
        }
      ]
    })
  ]
})
