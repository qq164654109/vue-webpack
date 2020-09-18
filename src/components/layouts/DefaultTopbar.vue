<template>
  <header class="topbar text-24">
    <div class="topbar-inner">
      <a class="href" href="/">周乎</a>
      <default-topbar-menu></default-topbar-menu>
      <default-topbar-user></default-topbar-user>
    </div>
  </header>
</template>

<script>
  import DefaultTopbarMenu from './DefaultTopbarMenu';
  import DefaultTopbarSearch from './DefaultTopbarSearch';
  import DefaultTopbarUser from './DefaultTopbarUser';

  export default {
    components: {
      DefaultTopbarMenu,
      DefaultTopbarSearch,
      DefaultTopbarUser
    }
  };
</script>

<style lang="scss" scoped>
.topbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: $default-topbar-height;
  background-color: $color-white;
  box-shadow: 0 1px 3px rgba(26,26,26,.1);
  z-index: 9999;
  .topbar-inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    height: 100%;
    margin: 0 auto;
  }
}
</style>