const path = require('path');
const server = require('./server'); 
const webpack = require('webpack');
const externals = require('./config/externals');
const cdn = require('./config/cdn');
const aliasMap = require('./config/aliasMap');
const variable = require('./config/variable');

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  productionSourceMap: false,
  devServer: {
    port: 3000,
    proxy: {
      [process.env.VUE_APP_API_URL]: {
        target: process.env.VUE_APP_PROXY_URL,
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          [`^${process.env.VUE_APP_API_URL}`]: ''
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
        prependData:  `@import "@/assets/style/theme.scss";
        @import "@/assets/style/layout.scss";
        $oss: "${process.env.VUE_APP_OSS_URL}";`
      }
    }
  },
  configureWebpack: config => {
    const myConfig = {};
    if (process.env.NODE_ENV === 'production') {
      // 生产环境 npm 包转 CDN
      myConfig.externals = externals;
    }
    myConfig.plugins = [
      // 配置全局环境变量
      new webpack.DefinePlugin(variable)
    ];
    return myConfig;
  },
  chainWebpack: config => {
    Object.keys(aliasMap).forEach(key => {
      config.resolve.alias.set(key, resolve(aliasMap[key]));
    });
    /**
     * 添加 CDN 参数到 htmlWebpackPlugin 配置中
     */
    config
      .plugin('html')
      .tap(args => {
        if (process.env.NODE_ENV === 'production') {
          args[0].cdn = cdn.build
        } else if (process.env.NODE_ENV === 'development') {
          args[0].cdn = cdn.dev
        }
        return args
      })
  },
  // 第三方插件配置
  pluginOptions: {}
}