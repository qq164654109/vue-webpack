// 点击元素外部
export default {
  bind(el, binding, vnode) {
    el.__vueClickOutside__ = function(e) {
      let show = el.style.display !== 'none';
      if (el.contains(e.target)) {
        return;
      }
      if (binding.expression && show) {
        binding.value(e);
      }
    };
    document.addEventListener('click', documentHandler);
  },
  unbind(el) {
    document.removeEventListener('click', el.__vueClickOutside__);
    delete el.__vueClickOutside__;
  }
}
