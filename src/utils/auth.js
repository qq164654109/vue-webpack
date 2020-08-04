import store from '@/store';
import website from '@/config/website';
import { sessionStore } from '@/utils/store';

export function getToken() {
  return sessionStore.get(website.token_key);
}

export function setToken(val) {
  sessionStore.set(website.token_key, val);
}

export function removeToken() {
  sessionStore.remove(website.token_key);
}

export function setAuth(roles) {
  let authSet = {};
  roles.forEach(role => {
    role.authorities.forEach(auth => {
      authSet[auth.name] = true;
    });
  });
  return authSet;
}

export function hasAuth(auth) {
  const userAuth = store.state.user.userAuth;
  if (Array.isArray(auth)) {
    return auth.every(a => userAuth[a]);
  } else {
    return userAuth[auth];
  }
}