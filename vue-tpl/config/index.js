'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},

    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    
    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    /**
     * vue开发过程中跨域最简单解决方案
     * 关于proxyTable的原理
     * 网上查了一下，这个代理实际上是利用http-proxy-middleware这个插件完成的，具体到这个插件的运行机制，实际上就是我们的本地服务器将请求转发给了目标服务器。之所以出现跨域是因为浏览器有同源策略的限制，但服务器是没有的，所以这种代理方式能够实现的机制大体就是：
     * 本地服务器 --》 代理 --》目标服务器 --》拿到数据后通过代理伪装成本地服务请求的返回值 ---》然后浏览器就顺利收到了我们想要的数据
     */
    // proxyTable: {
    //   '/api': {
    //     target: 'http://www.abc.com',  //目标接口域名, 将本地端口的一个请求代理到了http://www.abc.com这一域名下
    //     changeOrigin: true,  //是否跨域
    //     pathRewrite: {
    //       '^/api': '/api'   //重写接口
    //   }
    // },

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    // 使用相对路径加载静态资源
    assetsPublicPath: './',

    /**
     * Source Maps
     */
    // 不生成.map文件
    productionSourceMap: false,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
