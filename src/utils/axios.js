import Vue from 'vue';
import axios from 'axios';
import router from '../router';
import store from '../store';

// 进度条
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

NProgress.configure({
  showSpinner: false
});

const instance = axios.create({
  timeout: 10000,
  withCredentials: false
});

instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

instance.interceptors.request.use(
  config => {
    NProgress.start();
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

instance.interceptors.response.use(
  response => {
    NProgress.done();
    return response;
  },
  error => {
    NProgress.done();
    if (!error.response) {
      if (error.message.includes('timeout')) {
        // 网络超时
      } else {
        // 断网状态
      }
      return;
    }
    const status = error.response.status;
    switch (status) {
      case 401:
        // 无权限
        Vue.nextTick(() => {
          router.replace({
            path: '/401',
          });
        })
        break;
      case 403:
        // 登录信息过期，请重新登录
        Vue.nextTick(() => {
          router.replace({
            path: '/login',
            query: {
              redirect: router.currentRoute.fullPath
            }
          });
        })
        break;
      case 404:
        console.log('请求无效');
        break;
      default:
        // 其他错误
        console.log('请求失败');
    }
    return Promise.reject(error);
  }
);

function fetch(options = {}) {
  let opts = Object.assign({
    autoCancel: true,
    cancelToken: true,
    autoErrorRes: true,
    autoGetData: true
  }, options);

  if (opts.autoCancel) {
    opts.cancelToken = store.state.fetchSource.token;
  }
  if (/{|}/.test(opts.url)) {
    opts.url = opts.url.replace(/\{.*?\}/g, tempStr => {
      const paramKey = tempStr.replace(/{|}/g, '');
      const paramVal = opts.params[paramKey];
      delete opts.params[paramKey]
      return paramVal;
    });
  }
  if (opts.paramsStr) {
    opts.url = opts.url + '?' + opts.paramsStr;
  }
  if (opts.autoErrorRes) {
    opts.validateStatus = status => {
      return status >= 200 && status < 300;
    };
  }
  return instance(opts).then(res => {
    if (opts.autoGetData) {
      return res.data;
    }
  }).catch(error => {
    return Promise.reject(error);
  })
}

function storageFetch (type, options = {}, outTime = 60000) {
  let storageKey = JSON.stringify(options);
  let storageVal = window[type + 'Storage'].getItem(storageKey);
  if (storageVal) {
    storageVal = JSON.parse(storageVal);
    if (new Date().getTime() - storageVal.lastTime <= outTime) {
      return Promise.resolve(storageVal.data);
    }
  } else {
    return fetch(options).then(_ => {
      const data = options.autoGetData ? _ : _.data;
      window[type + 'Storage'].setItem(storageKey, {
        lastTime: new Date().getTime(),
        data
      });
      return _;
    });
  }
};

function sessionFetch(options, outTime) {
  return storageFetch('session', options, outTime)
}

function localFetch(options, outTime) {
  return storageFetch('local', options, outTime)
}

instance.fetch = function(url) {
  return function(options) {
    return fetch({
      url,
      ...options
    });
  }
};

instance.sessionFetch = function(url) {
  return function(options) {
    return sessionFetch({
      url,
      ...options
    });
  }
};

instance.localFetch = function(url) {
  return function(options) {
    return localFetch({
      url,
      ...options
    });
  }
};

export default instance;