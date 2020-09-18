import store from '@/store';
import { API_URL, PROXY_URL } from '@/config/env';
import ELEMENT from 'element-ui';
import instance from './axios';
import { replaceStrTemplate } from './index';

const default_opts = {
  baseURL: PROXY_URL ? PROXY_URL : API_URL,
  autoCancel: true,
  autoGetData: true,
  autoErrorRes: true
};
const default_storage_opts = {
  storageType: 'localStorage',
  storageOutTime: 60000
};

// 封装请求
export function request(options = {}) {
  const { 
    autoCancel, 
    autoGetData,
    template,
    paramStr, 
    successMsg, 
    errorMsg, 
    ...opts
  } = Object.assign({}, default_opts, options);
  
  // 自动取消请求
  if (autoCancel && store.state.requestSource) {
    opts.cancelToken = store.state.requestSource.token;
  }

  // url字符串模板替换
  opts.url = replaceStrTemplate(opts.url, template || {});
  
  // params拼接
  if (paramStr) {
    opts.url = opts.url + '?' + paramStr;
  }

  return instance(opts).then(res => {
    // 处理取消请求
    if (res === undefined) {
      return Promise.reject('cancel request')
    };
    // successMsg 参数触发成功提示框
    if (typeof successMsg === 'string') {
      ELEMENT.Message.success(successMsg);
    } else if (typeof successMsg === 'function') {
      ELEMENT.Message.success(successMsg(res));
    }
    // 自动取出并传递 res.data 数据
    return autoGetData ? res.data : res;
  }).catch(error => {
    // errorMsg 参数触发成功提示框
    if (typeof errorMsg === 'string') {
      ELEMENT.Message.error(errorMsg);
    } else if (typeof errorMsg === 'function') {
      ELEMENT.Message.error(errorMsg(error));
    }
    return error;
  });
};

export function storageRequest (options = {}) {
  const {
    storageType,
    storageOutTime,
    ...opts
  } = Object.assign({}, default_storage_opts, options);
  let storageKey = JSON.stringify(opts);
  let storageVal = JSON.parse(window[storageType].getItem(storageKey));
  if (storageVal && new Date().getTime() > storageVal.expire) {
    return Promise.resolve(storageVal);
  } else { 
    return request(opts).then(data => {
      window[storageType].setItem(storageKey, JSON.stringify({
        data,
        expire: new Date().getTime() + storageOutTime,
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
