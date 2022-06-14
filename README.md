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
    > src目录，src/plugins/rem.js添加rem适配。

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

 - 7. 根目录添加prettier.config.js配置文件prettier代码风格规范格式化

 - 8. postcss-px2rem进行单位转换
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

 - 9. vant组件按需引入
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
- 10. eslint、prettier、husky

