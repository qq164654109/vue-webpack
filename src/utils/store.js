export const sessionStore = {
  set(key, val, maxAge) {
    val = JSON.stringify({
      data: val,
      expire: maxAge ? new Date().getTime() + maxAge : null
    });
    sessionStorage.setItem(key, val);
  },
  get(key) {
    let val = JSON.parse(sessionStorage.getItem(key));
    if (val === null || val.expire !== null && new Date().getTime() > val.expire) {
      return null;
    }
    return val.data;
  },
  remove(key) {
    sessionStorage.removeItem(key);
  },
  clear() {
    sessionStorage.clear();
  }
}

export const localStore = {
  set(key, val, maxAge) {
    val = JSON.stringify({
      data: val,
      expire: maxAge ? new Date().getTime() + maxAge : null
    });
    localStorage.setItem(key, val);
  },
  get(key) {
    let val = JSON.parse(localStorage.getItem(key));
    if (val === null || val.expire !== null && new Date().getTime() > val.expire) {
      return null;
    }
    return val.data;
  },
  remove(key) {
    localStorage.removeItem(key);
  },
  clear() {
    localStorage.clear();
  }
};