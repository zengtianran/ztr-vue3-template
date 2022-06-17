const path = require("path");
const merge = require("webpack-merge");
const tsImportPluginFactory = require("ts-import-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const resolve = (dir) => path.resolve(__dirname, dir);

// 设置别名
const resolveAlias = (config) => {
  config.resolve.alias.set("@", resolve("src")).set("@views", resolve("src/views"));
};

// 三方UI模块按需加载
const tsImportPlugin = (config) => {
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
};

// 优化选项
const optimization = (config) => {
  // 配合runtimeChunk
  config
    .plugin("ScriptExtHtmlWebpackPlugin")
    .after("html")
    .use("script-ext-html-webpack-plugin", [
      {
        // 将 runtime 作为内联引入不单独存在
        inline: /runtime\..*\.js$/
      }
    ])
    .end();
  config.optimization.splitChunks({
    chunks: "all",
    cacheGroups: {
      // cacheGroups 下可以可以配置多个组，每个组根据test设置条件，符合test条件的模块
      commons: {
        name: "chunk-commons",
        test: resolve("src/components"),
        minChunks: 3, //  被至少用三次以上打包分离
        priority: 5, // 优先级
        reuseExistingChunk: true // 表示是否使用已有的 chunk，如果为 true 则表示如果当前的 chunk 包含的模块已经被抽取出去了，那么将不会重新生成新的。
      },
      node_vendors: {
        name: "chunk-libs",
        chunks: "initial", // 只打包初始时依赖的第三方
        test: /[\\/]node_modules[\\/]/,
        priority: 10
      },
      vantUI: {
        name: "chunk-vantUI", // 单独将 vantUI 拆包
        priority: 20, // 数字大权重到，满足多个 cacheGroups 的条件时候分到权重高的
        test: /[\\/]node_modules[\\/]_?vant(.*)/
      }
    }
  });
  config.optimization.runtimeChunk("single");
  // 压缩js
  config.optimization.minimize = true;
  config.optimization.minimizer = [
    new TerserPlugin({
      test: /\.js(\?.*)?$/i,
      parallel: true,
      terserOptions: {
        compress: {
          drop_debugger: true,
          drop_console: false
        }
      }
    })
  ];
};

// bundle 打包分析插件
const bundleAnalyzer = (config) => {
  config.plugin("bundle-analyzer-plugin").use(BundleAnalyzerPlugin, [
    {
      analyzerMode: "static"
    }
  ]);
};

// gzip压缩插件
const assetsGzip = (config) => {
  config.plugin("compression-webpack-plugin").use(CompressionWebpackPlugin, [
    {
      filename: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.html$|\.json$|\.css/,
      threshold: 10240, // 只有大小大于该值的资源会被处理 10240
      minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
      deleteOriginalAssets: false // 删除原文件
    }
  ]);
};

module.exports = {
  resolveAlias,
  tsImportPlugin,
  assetsGzip,
  bundleAnalyzer,
  optimization
};
