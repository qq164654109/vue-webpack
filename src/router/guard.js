import router from './index';
import store from '../store';
import axios from 'axios';
import { getToken } from '@/utils/auth';
import { whiteRouteNames } from './routes-common';


router.beforeEach((to, from, next) => {
  // 每次切换路由生成新的 cancelToken, 并中断之前的请求
  store.state.requestSource && store.state.requestSource.cancel();
  store.commit('SET_REQUEST_SOURCE', axios.CancelToken.source());
  // 路由鉴权(next方法谨慎使用，不能在一次守卫执行中被调用多次);
  if (whiteRouteNames.indexOf(to.name) > -1) {
    next();
  } else {
    if (!!getToken()) {
      // 登录后首次注册异步路由
      if (!router.authRoutes) {
        store.dispatch('user/ConfigUserMenu').then(() => {
          next({...to, replace: true});
        }).catch(() => {
          next({name: 'PageError'});
        })
      } else {
        next();
      }
    } else {
      // 没有 token 重定向到登录页
      next({ name: 'Login', query: { redirect: to.path } })
    }
  }
});

router.afterEach((to, from) => {});