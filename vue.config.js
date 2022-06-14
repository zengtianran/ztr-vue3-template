const path = require("path");
const chalk = require("chalk");
const merge = require("webpack-merge");
const tsImportPluginFactory = require("ts-import-plugin");
// 代理请求回调
const onProxyReq = (proxyReq) => {
  const { sockets } = proxyReq.agent;
  const keys = Object.keys(sockets);
  console.log(chalk.green(`当前请求代理到: ${keys[0]}${sockets[keys[0]][0]._httpMessage.path}`));
};
module.exports = {
  lintOnSave: false, // eslint保存检查
  // 链式调用配置webpack
  chainWebpack: (config) => {
    config.resolve.alias.set("@", path.resolve("src"));
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
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "@/styles/variables.scss";`
      },
      scss: {
        // 向全局sass样式传入共享的全局变量, $src可以配置图片cdn前缀
        // 详情: https://cli.vuejs.org/guide/css.html#passing-options-to-pre-processor-loaders
        additionalData: `@import "./src/styles/variables.scss";`
      },
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
  },
  devServer: {
    port: "8023",
    hot: true,
    open: false,
    https: false,
    host: "0.0.0.0",
    proxy: {
      "/api": {
        target: process.env.VUE_APP_API_SERVER,
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          "^/api": "/api"
        },
        onProxyReq
      }
    }
  }
};
