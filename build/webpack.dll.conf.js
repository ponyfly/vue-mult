'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

function createConfig () {
  return {
    entry: {
      dll: config.dll
    },
    output: {
      filename: '[name].js',
      library: '[name]_common'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          include: [resolve('src')]
        }
      ]
    }
  }
}

const webpackDevConfig = merge(createConfig(), {
  output: {
    path: resolve('manifest/dev-dll')
  },
  module: {
    rules: utils.styleLoaders({
      sourceMap: false,
      extract: true
    })
  },
  devtool: false,
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new webpack.DllPlugin({
      path: resolve('manifest/dev-manifest.json'),
      name: '[name]_common',
      context: resolve('')
    }),
    new ExtractTextPlugin({ filename: '[name].css' }),
    new webpack.HashedModuleIdsPlugin()
  ]
})

const webpackProdConfig = merge(createConfig(), {
  output: {
    path: resolve('manifest/dll')
  },
  module: {
    rules: utils.styleLoaders({
      sourceMap: false,
      extract: true
    })
  },
  devtool: false,
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.DllPlugin({
      path: resolve('manifest/manifest.json'),
      name: '[name]_common',
      context: resolve('')
    }),
    new ExtractTextPlugin({ filename: '[name].css' }),
    new webpack.optimize.UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false
        }
      },
      parallel: true,
      sourceMap: false
    }),
    new webpack.HashedModuleIdsPlugin()
  ]
})

module.exports = [webpackDevConfig, webpackProdConfig]
