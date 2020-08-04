export const sessionStore = {
  set(key, val) {
    let valStr = JSON.stringify(val);
    if (sessionStorage != null) {
      sessionStorage.setItem(key, valStr);
    }
  },
  get(key) {
    if (sessionStorage != null) {
      let valStr = sessionStorage.getItem(key);
      return JSON.parse(valStr);
    } else {
      return null;
    }
  },
  remove(key) {
    if (sessionStorage != null) {
      sessionStorage.removeItem(key);
    }
  },
  clear() {
    if (sessionStorage != null) {
      sessionStorage.clear();
    }
  }
}

export const localStore = {
  set(key, val) {
    let valStr = JSON.stringify(val);
    if (localStorage != null) {
      localStorage.setItem(key, valStr);
    }
  },
  get(key) {
    if (localStorage != null) {
      let valStr = localStorage.getItem(key);
      return JSON.parse(valStr);
    } else {
      return null;
    }
  },
  remove(key) {
    if (localStorage != null) {
      localStorage.removeItem(key);
    }
  },
  clear() {
    if (localStorage != null) {
      localStorage.clear();
    }
  }
};