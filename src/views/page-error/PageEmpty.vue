<template>
  <div class="page-error">
    <div class="img"
         style=" background-image: url('/img/bg/404.svg');"></div>
    <div class="content">
      <div class="desc">抱歉，你还没有菜单！</div>
      <div class="actions">
        <el-button type="primary" @click="$store.dispatch('Logout')">换个账号</el-button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "./style.scss";
</style>
