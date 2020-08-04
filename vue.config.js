const path = require('path');
const server = require('./server'); 

const externals = {
  'vue': 'Vue',
  'vue-router': 'VueRouter',
  'vuex': 'Vuex',
  'axios': 'axios',
  'echarts': 'echarts',
  'element-ui': 'ELEMENT'
}

const cdn = {
  dev: {
    css: [],
    js: [
      '//at.alicdn.com/t/font_1221716_kybzmkglgdd.js'
    ]
  },
  build: {
    css: [],
    js: [
      'https://cdn.bootcss.com/vue/2.5.2/vue.min.js',
      'https://cdn.bootcss.com/vue-router/3.0.1/vue-router.min.js',
      'https://cdn.bootcss.com/vuex/3.0.1/vuex.min.js',
      'https://cdn.bootcss.com/axios/0.18.0/axios.min.js',
      'https://cdn.bootcss.com/echarts/4.2.1/echarts.min.js',
      'https://cdn.bootcss.com/element-ui/2.12.0/index.js',
      '//at.alicdn.com/t/font_1221716_kybzmkglgdd.js'
    ]
  }
}

const aliasMap = {};

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: './',
  assetsDir: './',
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
        prependData:  `@import "@/assets/style/theme.scss";@import "@/assets/style/layout.scss";`
      }
    }
  },
  configureWebpack: config => {
    const myConfig = {};
    if (process.env.NODE_ENV === 'production') {
      // 生产环境 npm 包转 CDN
      myConfig.externals = externals;
    }
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
        }
        if (process.env.NODE_ENV === 'development') {
          args[0].cdn = cdn.dev
        }
        return args
      })
  },
  // 第三方插件配置
  pluginOptions: {}
}