import Vue from 'vue';
import { camelToCrossLine } from '@/utils';

const requireContext = require.context('../directives', false, /\.js$/);

requireContext.keys().forEach(fileName => {
  const directiveConfig = requireContext(fileName);
  const directiveName = camelToCrossLine(fileName.replace(/^\.\//, '').replace(/\.\w+$/, ''));
  Vue.directive(directiveName, directiveConfig.default || directiveConfig);
});