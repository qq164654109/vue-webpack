export const state = () => ({
  defaultName: 'default',
  componentNames: []
});

export const mutations = {
  setDefaultName(state, payload) {
    state.defaultName = payload
  },
  setComponentNames(state, payload) {
    state.componentNames = payload
  },
  setHalfscreen(state, payload) {
    state.halfscreen = payload;
  },
  setFullscreen(state, payload) {
    state.fullscreen = payload;
  },
  setTopbarData(state, payload) {
    state.topbarData = payload;
  },
  setSidebarData(state, payload) {
    state.sidebarData = payload;
  }
}