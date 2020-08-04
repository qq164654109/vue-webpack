import { sessionStore } from '@/utils/store';

export const state = () => ({
  userName: sessionStore.get('userName') || '',
  userInfo: sessionStore.get('userInfo') || {},
  userMenu: sessionStore.get('userMenu') || null,
  userAuth: sessionStore.get('userAuth') || {},
});

export const mutations = {
  SET_USER_NAME(state, payload) {
    state.userName = payload;
    sessionStore.set('userName', state.userName);
  },
  SET_USER_INFO(state, payload) {
    state.userInfo = payload;
    sessionStore.set('userInfo', state.userInfo);
  },
  SET_USER_MENU(state, payload) {
    state.userMenu = payload;
    sessionStore.set('userMenu', state.userMenu);
  },
  SET_USER_AUTH(state, payload) {
    state.userAuth = payload;
    sessionStore.set('userAuth', state.userAuth);
  },
}

export const actions = {
  ConfigUserMenu({commit}) {
    return getUserRoutes().then(data => {
      if (data.children) {
        const userMenu = data.children[0] ? data.children[0].children : [];
        commit('SET_USER_MENU', userMenu);
        router.updateRouter(userMenu);
      }
      return data;
    });
  },
}