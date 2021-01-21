const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)

const path = require('path')

module.exports = {
  publicPath: IS_PROD ? process.env.VUE_APP_PUBLIC_PATH : './', // 默认'/'，部署应用包时的基本 URL
  // outputDir: process.env.outputDir || 'dist', // 'dist', 生产环境构建文件的目录
  // assetsDir: "", // 相对于outputDir的静态资源(js、css、img、fonts)目录
  lintOnSave: false,
  runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本
  productionSourceMap: !IS_PROD, // 生产环境的 source map
  parallel: require('os').cpus().length > 1,
  pwa: {},
  css: {
    loaderOptions: {
      less: {
        // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
        lessOptions: {
          modifyVars: {
            // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
            hack: `true; @import "./src/assets/theme.less";`
          }
        }
      }
    }
  },
  // devServer: {
  //   contentBase: './dist',
  //   open: process.platform === 'darwin',
  //   hot: '0.0.0.0',
  //   port: 8080,
  //   disableHostCheck: true
  // },
  pluginOptions: {
    // 第三方插件配置
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, './src/assets/variables.less')] // less所在文件路径
    }
  }
  // devServer: {
  //   proxy: {
  //     '/': {
  //       target: 'http://cookbook.keuaile75.top/',
  //       changeOrigin: true,
  //       secure: false, // 如果是https接口，需要配置这个参数
  //       pathRewrite: { '^/api': '' }
  //     }
  //   }
  // }
}
