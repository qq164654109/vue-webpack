import Vue from 'vue';
import _get from 'lodash/get';
import wesite from '../config/website';
import fmtTime from '../utils/date';
import { request } from '../utils/axios-helper';

Vue.prototype.$website = wesite;
Vue.prototype.$val = _get;
Vue.prototype.$time = fmtTime;
Vue.prototype.$request = request;