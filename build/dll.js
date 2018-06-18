process.env.NODE_ENV = 'production'

const { promisify } = require('util')
const ora = require('ora')
const rm = promisify(require('rimraf'))
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const webpackConfig = require('./webpack.dll.conf')

const spinner = ora()
spinner.start()

console.log(chalk.cyan('  开始删除旧dll.'))
rm(path.resolve(__dirname, '../manifest'))
  .then(() => {
    console.log(chalk.cyan('  删除旧dll成功'))
    console.log(chalk.cyan('  开始打包...'))
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
    })
  }).catch(e => console.log(e))
