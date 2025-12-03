const { defineConfig } = require('@vue/cli-service')
const path = require('path')

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  
  // 配置 Webpack
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    }
  },
  
  // 开发服务器配置
  devServer: {
    port: 3000,
    host: 'localhost',
    open: true,
    hot: true
  },
  
  // CSS 配置
  css: {
    loaderOptions: {
      css: {
        modules: {
          auto: true
        }
      }
    }
  }
})