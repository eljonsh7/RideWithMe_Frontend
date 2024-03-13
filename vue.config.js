const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: "./",
  transpileDependencies: true,
  devServer: {
    historyApiFallback: true,
  },
  chainWebpack: (config) => {
    config.module
        .rule("vue")
        .use("vue-loader")
        .tap((options) => {
          return options;
        });
  },
})
