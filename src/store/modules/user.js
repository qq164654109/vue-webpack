import router from '@/router';
import { sessionStore } from '@/utils/store';
import { setToken } from '@/utils/auth';
import { login, getUserMenu } from '@/api/auth';

export const state = {
  userName: '',
  userInfo: {},
  userMenu: [],
  userAuth: {},
};

export const mutations = {
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
}

export const actions = {
  Login({commit}, payload) {
    return login(payload).then(data => {
      setToken(data.access_token);
      commit('SET_USER_NAME', data.username);
      return data;
    });
  },
  ConfigUserMenu({commit}) {
    return getUserMenu().then(data => {
      commit('SET_USER_MENU', data);
      router.updateRoutes(data);
      return data;
    });
  },
}