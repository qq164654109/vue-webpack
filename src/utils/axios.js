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

export default instance;