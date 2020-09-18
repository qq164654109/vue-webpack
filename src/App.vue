<template>
  <div id="app" class="width-limit">
    <transition name="el-fade-in-linear" mode="out-in">
      <component :is="layout"></component>
    </transition>
  </div>
</template>

<script>
// 自动注册layout组件
const requireContext = require.context('./layouts', false, /\.vue$/);
const layoutComponents = requireContext.keys().reduce((result, fileName) => {
  const componentConfig = requireContext(fileName);
  const componentName = fileName.replace(/^\.\//, '').replace(/\.\w+$/, '').toLowerCase();
  result[componentName] = componentConfig.default || componentConfig
  return result;
}, {});

export default {
  name: 'app',
  components: layoutComponents,
  beforeCreate() {
    this.$store.commit('layout/SET_LAYOUT_NAMES', Object.keys(layoutComponents));
  },
  computed: {
    layout() {
      const layoutRoute = this.$route.matched[0];
      if (layoutRoute) {
        const componentName = layoutRoute.components.default.layout || this.$store.state.layout.defaultName;
        return componentName.toLowerCase();
      } else {
        return '';
      }
    }
  }
};
</script>