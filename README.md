# vue

> calculatorApp

## Build Setup

> 海华金融工具移动端版11
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```
# 使用淘宝rem "lib-flexible" 写移动端适配
  使用"muse-ui"和 less布局页面
#目录结构
src
|-- assets------------静态资源文件夹
|-- router------------路由文件夹
|-- components------------非路由组件文件夹和首页文件夹
      |-- MyHeader---------------底部组件文件夹
        |-- myHeader.vue--------底部组件 vue
      |-- MyFooter---------------底部组件文件夹
        |-- myFooter.vue--------底部组件 vue
      |-- home---------------首页文件夹
        |-- home.vue--------首页组件 vue
|-- pages-----------------路由组件文件夹（各类计算器）
  说明：每个计算器大体相同 Accumulation.vue 中注释比较详细
|-- App.vue---------------应用根组件 vue
|-- main.js---------------应用入口 js

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
