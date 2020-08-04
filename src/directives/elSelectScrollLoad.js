export default {
  inserted(el, binding, vnode) {
    const { value } = binding;
    let loading = false;

    el.__selectWrapDom = el.querySelector('.el-scrollbar__wrap');

    el.__handleScroll = () => {
      if (el.__selectWrapDom.scrollHeight - el.__selectWrapDom.scrollTop <= el.__selectWrapDom.clientHeight && !loading) {
        loading = true;
        let selectLoadWrapDom = document.createElement('div');
        selectLoadWrapDom.classList.add('el-select__Load');
        let selectLoadIconDom = document.createElement('span');
        selectLoadIconDom.classList.add('el-icon-loading');
        selectLoadWrapDom.appendChild(selectLoadIconDom);
        el.__selectWrapDom.appendChild(selectLoadWrapDom);
        value().then(() => {
          el.__selectWrapDom.removeChild(selectLoadWrapDom);
          loading = false;
        }).catch(() => {
          el.__selectWrapDom.removeChild(selectLoadWrapDom);
          loading = false;
        });
      }
    };

    el.__selectWrapDom.addEventListener('scroll', el.__handleScroll);
  },
  unbind(el) {
    el.__selectWrapDom.removeEventListener('scroll', el.__handleScroll);
    el.__handleScroll = null;
    el.__selectWrapDom = null;
  }
};
