import axios from 'axios';

export default ({ store, to }) => {
  store.state.requestSource && store.state.requestSource.cancel();
  store.commit('SET_REQUEST_SOURCE', axios.CancelToken.source());
}