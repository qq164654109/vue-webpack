import Vue from "vue";
import Vuex from "vuex";
import persisted from './plugins/persisted';

Vue.use(Vuex);

const requireContext = require.context('./modules', false, /\.js$/);

const modules = requireContext.keys().reduce((prev, fileName) => {
  const moduleConfig = requireContext(fileName);
  const moduleName = fileName.replace(/^\.\//, '').replace(/\.\w+$/, '');
  const module = moduleConfig.default || moduleConfig;
  module.namespaced = true;
  prev[moduleName] = moduleConfig.default || moduleConfig;
  return prev;
}, {});

export default new Vuex.Store({
  plugins: [persisted(['user.userMenu'])],
  modules,
  state: {
    requestSource: null
  },
  mutations: {
    SET_REQUEST_SOURCE (state, payload) {
      state.requestSource = payload;
    }
  },
  actions: {}
});