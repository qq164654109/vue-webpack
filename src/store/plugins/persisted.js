import _get from 'lodash/get';
import _set from 'lodash/set';
import { sessionStore } from '@/utils/store';

const storage_key = 'vuex';

function reducer(state, paths) {
  return paths.reduce((result, path) => {
    let value = _get(state, path);
    if (value !== undefined) {
      _set(result, path, value);
    }
    return result;
  }, {});
}

export default function persisted(paths) {
  return store => {
    // store 初始化调用
    const storageState = sessionStore.get(storage_key) || null;
    store.replaceState(Object.assign({}, store.state, storageState));
    // 订阅 mutation
    store.subscribe((mutation, state) => {
      sessionStore.set(storage_key, paths ? reducer(state, paths) : state); 
    });
  }
}