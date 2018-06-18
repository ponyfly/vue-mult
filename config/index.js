const page = require('../page')

// 使用绝对路径的页面
const useAbsolutePage = {
  // index: '/'
}
// 不抽出css的页面
const unExtractCss = {
  // index: true
}
// 不实用vendor的页面
const unuseDll = {
  // index: true
}

module.exports = {
  page,
  absolutePath: useAbsolutePage[page] || '', // / 或者 cdn路径 //cdn.com/
  extractCss: !unExtractCss[page], // 生产环境是否抽出css为读文件
  useDll: !unuseDll[page],  // 是否使用公共资源缓存
  dll: [        // dll 请先运行npm run dll
    'babel-polyfill',
    'vue',
    'vue-router',
    'weui'
  ]
}
