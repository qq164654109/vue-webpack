import website from '@/config/website';

export default {
  state: {
    defaultName: website.layout,
    layoutNames: []
  },
  mutations: {
    SET_DEFAULT_NAME(state, payload) {
      state.defaultName = payload
    },
    SET_LAYOUT_NAMES(state, payload) {
      state.layoutNames = payload
    }
  }
};