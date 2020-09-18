import Vue from 'vue';
import _get from 'lodash/get';
import wesite from '../config/website';
import fmtTime from '../utils/date';
import { request, storageRequest } from '../utils/axios-helper';

Vue.prototype.V_WEBSITE = wesite;
Vue.prototype.V_GET = _get;
Vue.prototype.V_TIME = fmtTime;
Vue.prototype.V_REQUEST = request;
Vue.prototype.V_STORAGE_REQUEST = storageRequest;

Vue.prototype.$watchOnce = function(expOrFn, cb, options) {
  const unWatch = this.$watch(expOrFn, function(val) {
    if (typeof cb === 'function') {
      cb.call(this, val);
    } else if (cb.handler) {
      cb.handler.call(this, val)
    }
    unWatch();
  }, { ...options, immediate: false })
};