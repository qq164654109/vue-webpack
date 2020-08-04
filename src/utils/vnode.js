
import _get from 'lodash/get';

export function getListener(vnode, evt) {
  const isCompNode = !!vnode.componentOptions;
  if (isCompNode) {
    return _get(vnode, `componentOptions.listeners.${evt}`);
  } else {
    return _get(vnode, `data.on.${evt}`);
  }
};

export function addListener(vnode, evt, handler) {
  const isCompNode = !!vnode.componentOptions;
  if (isCompNode) {
    const listeners = vnode.componentOptions.listeners;
    if (listeners) {
      vnode.componentOptions.listeners = {[evt]: handler, ...listeners};
    } else {
      vnode.componentOptions.listeners = {
        on: {
          [evt]: handler
        }
      };
    }
  } else {
    if (vnode.data) {
      const listeners = vnode.data.on || {};
      vnode.data.on = {[evt]: handler, ...listeners};
    } else {
      vnode.data = {
        on: {
          [evt]: handler
        }
      };
    }
  }
};

export function removeListener(vnode, evt) {
  const isCompNode = !!vnode.componentOptions;
  if (isCompNode) {
    if (!_get(vnode, `componentOptions.listeners.${evt}`)) return;
    delete vnode.componentOptions.listeners[evt];
  } else {
    if (!_get(vnode, `data.on.${evt}`)) return;
    delete vnode.data.on[evt];
  }
};

export function removeAllListeners(vnode) {
  const isCompNode = !!vnode.componentOptions;
  if (isCompNode) {
    vnode.componentOptions.listeners && (vnode.componentOptions.listeners = {});
  } else {
    vnode.data && vnode.data.on && (vnode.data.on = {});
  }
};