<template>
  <div id="layout" class="full">
    <div class="top"></div>
    <div class="left"></div>
    <div class="cont">
      <router-view></router-view>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$bg: #818EA0;
#layout {
  position: relative;
  height: 100vh;
  .top {
    position: absolute;
    top: 15px;
    left: 15px;
    right: 15px;
    height: 65px;
    background-color: $bg;
    border-radius: 4px;
  }
  .left {
    position: absolute;
    top: 95px;
    left: 15px;
    width: 150px;
    bottom: 15px;
    background-color: $bg;
    border-radius: 4px;
  }
  .cont {
    position: absolute;
    top: 95px;
    left: 180px;
    bottom: 15px;
    right: 15px;
    background-color: $bg;
    border-radius: 4px;
  }
}
</style>
