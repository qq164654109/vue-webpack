import Vue from 'vue';
import _get from 'lodash/get';
import fmtTime from '../utils/date';
import { request } from '../utils/axios-helper';

Vue.prototype.$val = _get;
Vue.prototype.$time = fmtTime;
Vue.prototype.$request = request;