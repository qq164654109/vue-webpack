import router from './index';
import store from '../store';

// handles
import cancelRequest from './handles/cancel-request';

router.beforeEach((to, from, next) => {
  const context = { store, router, to, from, next };
  
  next();
});

router.afterEach((to, from) => {
  const context = { store, router, to, from };
  // 切换路由后中断之前的请求
  cancelRequest(context);
});