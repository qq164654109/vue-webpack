import router from './index';
import store from '../store';
import axios from 'axios';
import { getToken } from '@/utils/auth';
import { whiteRouteNames } from './routes-common';


router.beforeEach((to, from, next) => {
  // 每次切换路由生成新的 cancelToken, 并中断之前的请求
  store.state.requestSource && store.state.requestSource.cancel();
  store.commit('SET_REQUEST_SOURCE', axios.CancelToken.source());
  // 路由鉴权
  const logged = !!getToken();
  if (whiteRouteNames.indexOf(to.name) > -1) {
    logged && to.name === 'Login' ? next('/') : next();
  } else {
    if (logged && router.authRoutes) {
      next()
    } else {
      store.commit('user/CLEAR_USER');
      next({ name: 'Login', query: { redirect: to.path } })
    }
  }
});