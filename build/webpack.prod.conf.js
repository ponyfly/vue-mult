'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')

const webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: false,
      extract: true
    })
  },
  devtool: false,
  output: {
    filename: '[name].js?[chunkhash:7]',
    chunkFilename: '[name].js?[chunkhash:7]',
    publicPath: config.absolutePath ? config.absolutePath + `${config.page}/static/` : './static/'
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    // UglifyJs do not support ES6+, you can also use babel-minify for better treeshaking: https://github.com/babel/minify
    new webpack.optimize.UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false
        }
      },
      parallel: true,
      sourceMap: false
    }),
    // extract css into its own file
    new ExtractTextPlugin({
      filename: '[name].css?[contenthash:7]'
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: '../index.html',
      template: `./src/${config.page}/template.html`,
      inject: true,
      path: config.absolutePath || '../',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      }
    }),
    // keep module.id stable when vender modules does not change
    new webpack.HashedModuleIdsPlugin(),
    // enable scope hoisting
    new webpack.optimize.ModuleConcatenationPlugin()
  ]
})

if (false) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig

if (config.useDll) {
  module.exports.plugins.push(new AddAssetHtmlPlugin([{
    filepath: './manifest/dll/*.js',
    includeSourcemap: false,
    publicPath: config.absolutePath ? config.absolutePath + 'dll/' : '../dll/',
    hash: true,
    outputPath: '../../dll'
  },{
    filepath: './manifest/dll/*.css',
    includeSourcemap: false,
    publicPath: config.absolutePath ? config.absolutePath + 'dll/' : '../dll/',
    hash: true,
    typeOfAsset: 'css',
    outputPath: '../../dll'
  }]))
}
