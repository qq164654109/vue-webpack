<template>
  <ul class="default-topbar-menu no-select">
    <router-link tag="li" class="menu-item text-18" exact-active-class="active" 
      key="Home" to="/"
    >
      首页
    </router-link>
    <router-link tag="li" class="menu-item text-18" active-class="active" 
      v-for="item in menuList" :key="item.name" :to="item.name"
    >
      {{item.title}}
    </router-link>
  </ul>
</template>

<script>
  export default {
    computed: {
      menuList() {
        return this.$store.state.user.userMenu.map(({children, ...rest}) => rest);
      }
    }
  }
</script>

<style lang="scss" scoped>
.default-topbar-menu {
  list-style: none;
  margin: 0 20px;
  .menu-item {
    display: inline-block;
    padding: 0 17px;
    line-height: $default-topbar-height;
    color: $color-notes;
    cursor: pointer;
    &.active {
      color: $color-blue;
    }
  }
}
</style>