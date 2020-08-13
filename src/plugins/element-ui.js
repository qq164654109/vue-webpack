import Vue from 'vue'
import Element from 'element-ui'
import '../assets/style/element-variables.scss'

// 配置默认属性
Element.Input.props.clearable.default = true;
Element.Dialog.props.closeOnClickModal.default = false;
Element.Pagination.props.layout.default = 'total, prev, pager, next, jumper';
Element.Switch.props.activeColor.default = "#67C23A";
Element.Switch.props.inactiveColor.default = "#dcdfe6";

Vue.use(Element);

Vue.prototype.$confirm = (message, _, options = {}) => Element.MessageBox.confirm(message, '提示', {
  confirmButtonText: '确定',
  cancelButtonText: '取消',
  type: 'warning',
  ...options
})
