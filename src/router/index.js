import Vue from 'vue';
import commonRoutes from './routes-common';
import AuthVueRouter from './router';

Vue.use(AuthVueRouter);

const options = {
  mode: 'history',
  base: process.env.BASE_URL,
  routes: commonRoutes,
  scrollBehavior (to, from, savedPosition) {
    // savedPosition 这个参数当且仅当导航 (通过浏览器的 前进/后退 按钮触发) 时才可用  效果和 router.go() 或 router.back()
    if (savedPosition) {
      // 返回savedPosition 其实就是 当用户点击 返回的话，保持之前游览的高度
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop
      }
      return {
        x: 0,
        y: to.meta.savedPosition || 0
      }
    }
  }
}

const router = new AuthVueRouter(options);

export default router;
