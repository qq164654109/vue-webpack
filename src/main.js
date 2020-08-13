import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './router/guard';

// 插件
import './plugins/window-inject';
import './plugins/element-ui';
import './plugins/vue-components';
import './plugins/vue-directives';
import './plugins/vue-filters';
import './plugins/vue-inject';
import './plugins/vue-scroll';
import './plugins/vue-virtual-scroller';

// 浏览器 css 兼容文件
import 'normalize.css';
// 项目 css 统一文件
import '@/assets/style/index.scss';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
