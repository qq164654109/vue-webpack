import router from '@/router';
import { setToken, removeToken } from '@/utils/auth';
import { login, requestUserMenu } from '@/api/auth';

export default {
  state: {
    userName: '',
    userInfo: {},
    userMenu: [],
    userAuth: {},
  },
  mutations: {
    SET_USER_NAME(state, payload) {
      state.userName = payload;
    },
    SET_USER_INFO(state, payload) {
      state.userInfo = payload;
    },
    SET_USER_MENU(state, payload) {
      state.userMenu = payload;
    },
    SET_USER_AUTH(state, payload) {
      state.userAuth = payload;
    },
    CLEAR_USER(state) {
      // 清空用户信息，菜单，权限
      state.userName = '';
      state.userInfo = {};
      state.userMenu = [];
      state.userAuth = {};
      removeToken();
      router.resetRouter();
    }
  },
  actions: {
    Login({commit}, payload) {
      return login(payload).then(data => {
        setToken(data.access_token);
        commit('SET_USER_NAME', data.username);
        return data;
      });
    },
    Logout({commit}) {
      return new Promise((resolve, reject) => {
        try {
          commit('CLEAR_USER');
          router.push({name: 'Login'});
          resolve();
        } catch {
          reject();
        }
      });
    },
    ConfigUserMenu({commit}) {
      return requestUserMenu().then(data => {
        commit('SET_USER_MENU', data);
        router.updateRoutes(data);
        return data;
      });
    }
  }
}