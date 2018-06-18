process.env.NODE_ENV = 'production'

const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')
const webpackConfig = require('./webpack.prod.conf')

console.log(chalk.cyan('  开始打包.\n'))
const spinner = ora()
spinner.start()

rm(path.resolve(webpackConfig.output.path, '..'), err => {
  if (err) throw err
  webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  打包出错.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('  打包结束.\n'))
    if (config.absolutePath) {
      console.log(chalk.yellow(
        '  提示: 这是打包成绝对路径的文件.\n' +
        '  不能直接打开，请起一个服务打开.\n'
      ))
    }
  })
})
