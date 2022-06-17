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

 #### 配置过程事项

 - 1、升级vue(3.2x)、vuex、vue-router版本
   
   ```js
   pnpm install vue vue-router vuex
   ```
   
 - 2、全局环境变量配置以及打包配置，环境配置文件
   
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
   
 - 3、新建暴露配置文件/public/static/serviceConfig.js  

   ```js
   // 全局变量配置
   window.SERVICE_CONFIG = {
     apiUrl: '', // 接口服务域名
     debug: true // 是否开启调试模式
   }
   ```

 - 4、引入vantUI库以及移动端rem适配 
   
    > src目录，src/plugins/rem.js添加rem适配。
   
 - 5、安装sass、sass-loader
   
   ```bash
    pnpm add node-sass sass-loader
   ```

 - 6、新建vue.config.js配置文件(!!!注意不要建成.ts后缀了)
   
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
   
 - 7、根目录添加prettier.config.js配置文件prettier代码风格规范格式化

 - 8、postcss-px2rem进行单位转换
   
   ```js
      {
       css: {
        loaderOptions: {
          postcss: {
            plugins: [
              require("postcss-plugin-px2rem")({
                rootValue: 100, //换算基数， 默认100  ，这样的话把根标签的字体规定为1rem为50px,这样就可以从设计稿上量出多少个px直接在代码中写多上px了。
                // unitPrecision: 5, //允许REM单位增长到的十进制数字。
                //propWhiteList: [],  //默认值是一个空数组，这意味着禁用白名单并启用所有属性。
                // propBlackList: [], //黑名单
                exclude: /(node_module)/, //默认false，可以（reg）利用正则表达式排除某些文件夹的方法，例如/(node_module)\/如果想把前端UI框架内的px也转换成rem，请把此属性设为默认值
                // selectorBlackList: [], //要忽略并保留为px的选择器
                // ignoreIdentifier: false,  //（boolean/string）忽略单个属性的方法，启用ignoreidentifier后，replace将自动设置为true。
                // replace: true, // （布尔值）替换包含REM的规则，而不是添加回退。
                mediaQuery: false, //（布尔值）允许在媒体查询中转换px。
                minPixelValue: 3 //设置要替换的最小像素值(3px会被转rem)。 默认 0
              })
            ]
          }
        }
      }
      }
    ```
   
 - 9、vant组件按需引入
   
   ```js
     {
       chainWebpack: (config) => {
          config.module
            .rule("ts")
            .use("ts-loader")
            .tap((options) => {
              options = merge(options, {
                transpileOnly: true,
                getCustomTransformers: () => ({
                  before: [
                    tsImportPluginFactory({
                      libraryName: "vant",
                      libraryDirectory: "es",
                      style: true
                    })
                  ]
                }),
                compilerOptions: {
                  module: "es2015"
                }
              });
              return options;
            });
        }
     }
   ```
   
 - 10、安装husky、lint-staged，  `pnpm install husky lint-staged -D`    
   
   - 初始化配置文件
   
     ```bash
      # 终端执行命令创建pre-commit文件
      pnpm husky add .husky/pre-commit "pnpm test"
     ```
   
   - package.json配置
   
     ```json
      // package.json
       {
          "scripts": {
           "prepare": "husky install",
           "test": "lint-staged",
          },
          "devDependencies": {
           "husky": "^8.0.1",
           "lint-staged": "^13.0.1",
          },
          "lint-staged": {
           "src/**/*.{js,vue,ts,jsx,tsx}": [
             "prettier --write",
             "eslint --fix"
           ],
           "src/**/*.{html,css,less,scss,md}": [
             "prettier --write"
           ]
         }
       }
     ```
   
 - 11、添加gzip打包插件 `pnpm i compression-webpack-plugin@4.0.0 -D`  
   
   ```js
   // vue.config.js 配置
   {
     chainWebpack: (config) => {
       config.plugin("compression-webpack-plugin").use(require('compression-webpack-plugin'), [
         {
           filename: "[path].gz[query]",
           algorithm: "gzip",
           test: /\.js$|\.html$|\.json$|\.css/,
           threshold: 10240, // 只有大小大于该值的资源会被处理 10240
           minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
           deleteOriginalAssets: false // 删除原文件
         }
       ]);
     }
   }
   ```
   
 - 12、 模块打包文件大小分析 `pnpm i webpack-bundle-analyzer -D `   
   
   ```js
   {
      chainWebpack: (config) => {
         config.plugin("bundle-analyzer-plugin").use(BundleAnalyzerPlugin, [
           {
             analyzerMode: "static"
           }
         ]);
      }
   }
   ```
   
 - 13、优化项，optimization
   
   - `runtimeChunk`设置 
   
     > 设置`runtimeChunk`，是将包含`chunks`映射关系单独从`app.js`里提取出来，因为每一个`chunk`的id基本都是基于内容`hash`出来的，所以每次改动都会影响它，如果不将它提取出来的话，等于`app.js`每次都会改变。缓存就失效了。设置`runtimeChunk`之后，`webpack`就会生成一个`runtime~xxx.js`的文件。
     > 每次更改所谓的运行时代码文件时，打包构建时`app.js`的`hash`值是不会改变的。如果每次项目更新都会更改`app.js`的`hash`值，那么用户端浏览器每次都需要重新加载变化的`app.js`，如果项目大切优化分包没做好的话会导致第一次加载很耗时，导致用户体验变差。现在设置了`runtimeChunk`，就解决了这样的问题。所以这样做的目的是避免文件的频繁变更导致浏览器缓存失效，是更好的利用缓存。提升用户体验。
   
   - `script-ext-html-webpack-plugin` 插件  
   
     > 虽然每次构建后app.js 的hash没有改变，但是runtime~xxx.js会变。每次重新构建上线后，浏览器每次都需要重新请求它，它的 http 耗时远大于它的执行时间了，所以建议不要将它单独拆包，而是将它内联到我们的 index.html 之中。
   
     ```js
     {
       chainWebpack: (config) => {
       config
         .plugin("ScriptExtHtmlWebpackPlugin")
         .after("html")
         .use("script-ext-html-webpack-plugin", [
           {
             // 将 runtime 作为内联引入不单独存在
             inline: /runtime\..*\.js$/
           }
         ]) 
       }
     }
     ```
   
- 14、
  
TODO: request封装、cache封装、
  
  
