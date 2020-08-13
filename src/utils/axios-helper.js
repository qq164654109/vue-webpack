import store from '@/store';
import { API_URL } from '@/config/env';
import ELEMENT from 'element-ui';
import instance from './axios';

const default_opts = {
  baseURL: API_URL,
  autoCancel: true,
  autoGetData: true,
  cancelToken: true,
  autoErrorRes: true
};
const default_storage_opts = {
  storageType: 'localStorage',
  storageOutTime: 60000
};

// 封装请求
export function request(options = {}) {
  let opts = Object.assign({}, default_opts, options);

  // 自动取消请求
  if (opts.autoCancel) {
    opts.cancelToken = store.state.requestSource.token;
  }

  // url字符串模板替换
  if (/{|}/.test(opts.url)) {
    opts.url = opts.url.replace(/\{.*?\}/g, tempStr => {
      const paramKey = tempStr.replace(/{|}/g, '');
      const paramVal = opts.params[paramKey];
      delete opts.params[paramKey];
      return paramVal;
    });
  }
  
  // params拼接
  if (opts.paramStr) {
    opts.url = opts.url + '?' + opts.paramStr;
    delete opts.paramStr;
  }

  return instance(opts).then(res => {
    // successMsg 参数触发成功提示框
    if (typeof opts.successMsg === 'string') {
      ELEMENT.Message.success(opts.successMsg);
    } else if (typeof opts.successMsg === 'function') {
      ELEMENT.Message.success(opts.successMsg(res));
    }
    // 自动取出并传递 res.data 数据
    return opts.autoGetData ? res.data : res;
  }).catch(error => {
    // errorMsg 参数触发成功提示框
    if (typeof opts.errorMsg === 'string') {
      ELEMENT.Message.error(opts.errorMsg);
    } else if (typeof opts.errorMsg === 'function') {
      ELEMENT.Message.error(opts.errorMsg(error));
    }
    return Promise.reject(error);
  });
};

export function storageRequest (options = {}) {
  let opts = Object.assign({}, default_storage_opts, options);
  let storageType = opts.storageType;
  let storageKey = JSON.stringify(options);
  let storageVal = JSON.parse(window[storageType].getItem(storageKey));
  if (storageVal && new Date().getTime() - storageVal.lastTime <= opts.storageOutTime) {
    return Promise.resolve(storageVal);
  } else {
    return request(options).then(data => {
      window[storageType].setItem(storageKey, JSON.stringify({
        lastTime: new Date().getTime(),
        data
      }));
      return data;
    });
  }
};

export function createRequest(url, _opts) {
  return opts => request({ ..._opts, ...opts, url });
};

export function createStorageRequest(url, _opts) {
  return opts => storageRequest({ ..._opts, ...opts, url });
};
