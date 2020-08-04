import Vue from 'vue';

const requireContext = require.context('../components/commons', false, /\.vue$/);

requireContext.keys().forEach(fileName => {
  const componentConfig = requireContext(fileName);
  const componentName = fileName.replace(/^\.\//, '').replace(/\.\w+$/, '');
  Vue.component(componentName, componentConfig.default || componentConfig);
});