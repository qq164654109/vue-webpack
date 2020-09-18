const path = require('path');
const server = require('./server'); 
const webpack = require('webpack');
const externals = require('./config/externals');
const cdn = require('./config/cdn');
const aliasMap = require('./config/alias-map');
const globalVariable = require('./config/global-variable');
const scssVariable = require('./config/scss-variable');

function resolve(dir) {
  return path.join(__dirname, dir);
};

function transStr(obj) {
  return Object.entries(obj).reduce((result, [key, val]) => {
    return result += `${key}: ${val};`
  }, '');
};

module.exports = {
  productionSourceMap: false,
  devServer: {
    open: true,
    port: 3000,
    proxy: {
      [process.env.VUE_APP_PROXY_URL]: {
        target: process.env.VUE_APP_API_URL,
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          [`^${process.env.VUE_APP_PROXY_URL}`]: ''
        }
      }
    },
    before(app) {
      server(app);
    }
  },
  css: {
    loaderOptions: {
      scss: {
        prependData:  `
          @import "@/assets/style/theme.scss";
          @import "@/assets/style/layout.scss";
        ` + transStr(scssVariable),
      }
    }
  },
  configureWebpack: config => {
    const myConfig = {};
    /**
     * 生产环境 npm 包转 CDN
     */
    if (process.env.NODE_ENV === 'production') {
      myConfig.externals = externals;
    }
    myConfig.plugins = [
      /**
       * 配置全局环境变量
       */
      new webpack.DefinePlugin(globalVariable)
    ];
    return myConfig;
  },
  chainWebpack: config => {
    /**
     * 路径别名
     */
    Object.keys(aliasMap).forEach(key => {
      config.resolve.alias.set(key, resolve(aliasMap[key]));
    });
    /**
     * 添加 CDN 参数到 htmlWebpackPlugin 配置中
     */
    config
      .plugin('html')
      .tap(args => {
        args[0].cdn = cdn[process.env.NODE_ENV];
        return args
      })
  },
  /**
   * 第三方插件配置
   */
  pluginOptions: {}
}