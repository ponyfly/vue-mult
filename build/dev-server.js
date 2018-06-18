process.env.NODE_ENV = 'development'

const express = require('express')
const webpack = require('webpack')
const webpackConfig = require('./webpack.dev.conf')

const app = express()
const compiler = webpack(webpackConfig)

const devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

const hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: false,
  heartbeat: 2000
})

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// serve pure static assets
app.use('/lib', express.static('./lib'))

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  app.listen(8080, '0.0.0.0', () => {
      console.log('Listening at http://localhost:8080/')
    })
})
