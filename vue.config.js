const path = require("path");
const chalk = require("chalk");
// 代理请求回调
const onProxyReq = (proxyReq) => {
  const { sockets } = proxyReq.agent;
  const keys = Object.keys(sockets);
  console.log(
    chalk.green(
      `当前请求代理到: ${keys[0]}${sockets[keys[0]][0]._httpMessage.path}`
    )
  );
};
module.exports = {
  lintOnSave: true, // eslint保存检查
  // 链式调用配置webpack
  chainWebpack: (config) => {
    config.resolve.alias.set("@", path.resolve("src"));
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "@/styles/variables.scss";`,
      },
      scss: {
        // 向全局sass样式传入共享的全局变量, $src可以配置图片cdn前缀
        // 详情: https://cli.vuejs.org/guide/css.html#passing-options-to-pre-processor-loaders
        additionalData: `@import "./src/styles/variables.scss";`,
      },
    },
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
          "^/api": "/api",
        },
        onProxyReq,
      },
    },
  },
};
