export default {
  inserted(el, binding) {
    const selectListDom = el.querySelector('.el-select-dropdown__list');
    const { value } = binding;

    let loading = false;
    let selectItemDom = document.createElement('li');
    let selectTxtDom = document.createElement('span');

    selectItemDom.classList.add('el-select-dropdown__load');
    selectTxtDom.innerHTML = '加载更多';
    selectItemDom.appendChild(selectTxtDom);
    selectItemDom.onclick = function() {
      if (!loading) {
        loading = true;
        selectTxtDom.innerHTML = '';
        selectTxtDom.classList.add('el-icon-loading');
        value().then(() => {
          selectTxtDom.classList.remove('el-icon-loading');
          selectTxtDom.innerHTML = '加载更多';
          selectListDom.removeChild(selectItemDom);
          selectListDom.appendChild(selectItemDom);
          loading = false;
        }).catch(() => {
          selectTxtDom.classList.remove('el-icon-loading');
          selectTxtDom.innerHTML = '加载更多';
          loading = false;
        });
      }
    };
    selectListDom.appendChild(selectItemDom);
  }
};
