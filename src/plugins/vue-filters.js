import Vue from 'vue';
import { camelToCrossLine } from '@/utils';

const requireContext = require.context('../filters', false, /\.js$/);

requireContext.keys().forEach(fileName => {
  const filterConfig = requireContext(fileName);
  const filterName = camelToCrossLine(fileName.replace(/^\.\//, '').replace(/\.\w+$/, ''));
  Vue.filter(filterName, filterConfig.default || filterConfig);
});