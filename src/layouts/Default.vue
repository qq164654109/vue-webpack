<template>
  <div id="layout-default">
    <default-topbar></default-topbar>
    <main class="main">
      <transition name="fadetoleft" mode="out-in">
        <router-view></router-view>
      </transition>
    </main>
  </div>
</template>

<script>
  import DefaultTopbar from '@/components/layouts/DefaultTopbar';

  export default {
    components: {
      DefaultTopbar
    }
  }
</script>

<style lang="scss" scoped>
#layout-default {
  padding-top: $default-topbar-height;
  .main {
    overflow: hidden;
  }
}
</style>
