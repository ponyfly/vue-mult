### 多页应用启动模板 for vue

没有繁杂的各种配置，你想到的问题都给你解决了，只需要专注于业务逻辑

### 使用
## 1: 在 `page.js`里面配置好本次开发的页面
```javascript
module.exports = 'index'
```

## 2：在 `config/index.js` 里面配置 `dll`公共资源库,然后

```bash
npm run dll
```
生成公共资源库缓存起来，极大增加编译速度

## 3: 开发环境
```bash
npm run dev
```

### 4: 生产环境
```bash
npm run build
```

#### 详细说明

主要功能：

1. css处理，支持less,sass,postcss等，自行安装对应 `loader` 即可，自动添加前缀 
2. 公共缓存 `vendor`
3. 相对路径/绝对路径支持，具体配置在 `config/index.js`里面

然后就没有然后了
