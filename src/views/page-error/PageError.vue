<template>
  <div class="page-error">
    <div class="img"
         style=" background-image: url('/img/bg/500.svg');"></div>
    <div class="content">
      <div class="desc">抱歉，获取菜单失败！</div>
      <div class="actions">
        <el-button type="primary" @click="$store.dispatch('Logout')">重新登录</el-button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "./style.scss";
</style>
