'use strict'
const path = require('path')
const vueLoaderConfig = require('./vue-loader.conf')
const webpack = require('webpack')
const config = require('../config')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  entry: {
    app: resolve(`src/${config.page}/main.js`)
  },
  output: {
    path: resolve(`dist/${config.page}/static`),
    filename: '[name].js',
    chunkFilename: '[name].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': resolve('src'),
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src')]
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        include: [/src\/.*\/icons/],
        options: {
          symbolId: 'icon-[name]'
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        exclude: [/src\/.*\/icons/],
        options: {
          limit: 6000,
          name: '[name].[ext]?[hash:7]'
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[ext]?[hash:7]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[ext]?[hash:7]'
        }
      }
    ]
  },
  plugins: []
}

if (config.useDll) {
  module.exports.plugins.push(new webpack.DllReferencePlugin({
    context: resolve(''),
    manifest: isProduction ? require('../manifest/manifest.json') : require('../manifest/dev-manifest.json')
  }))
}
