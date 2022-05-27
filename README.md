### ztr-v3-template
 > vue3模板，vue3.2+、pnpm、 Router、 vuex、 webpack4.x

#### 安装

```js
   pnpm install
```
#### 开发编译启动
```js
   pnpm run serve
```
#### 线上打包编译
```js
   pnpm run build
```
 
 ##### 配置过程事项

 - 1. 升级vue(3.2x)、vuex、vue-router版本
   ```js
     pnpm install vue vue-router vuex
   ```
 - 2. 全局环境变量配置以及打包配置，环境配置文件
   ```bash
     .env.development: 开发环境配置文件
     .env.test: 测试环境配置文件
     .env.production: 生产环境配置文件
   ```
   > 配置文件属性信息
   ``` bash
      #环境变量
      NODE_ENV = test
      #api接口域名
      VUE_APP_API_SERVER = https://api.xxxx.com 
      #接口地址前缀，工程名
      VUE_APP_API_BASE = project_name
      #请求超时时间
      VUE_APP_TIMEOUT = 5000
      #是否允许mock
      VUE_APP_ENABLE_MOCK = false
      #mock服务地址
      VUE_APP_MOCK_SERVER = https://api.xxxx.com
      #加载调试控制台
      VUE_APP_VCONSOLE = true
   ```
 - 3. 新建暴露配置文件/public/static/serviceConfig.js
     ```js
         // 全局变量配置
         window.SERVICE_CONFIG = {
            apiUrl: '', // 接口服务域名
            debug: true // 是否开启调试模式
         }
     ```
 - 4. 引入vantUI库以及移动端rem适配
 - 5. 安装sass、sass-loader
     ```bash
       pnpm add node-sass sass-loader
     ```
 - 6. 新建vue.config.js配置文件(!!!注意不要建成.ts后缀了)
    ```js
       // 增加全局scss变量注入
       module.exports = {
        css: {
          loaderOptions: {
            scss: {
              additionalData: `@import "./src/styles/variables.scss";`,
            },
          },
        }
       }
    ```
 - 7. 
