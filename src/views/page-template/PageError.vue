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

<script>
  export default {
    layout: 'blank'
  }
</script>

<style lang="scss" scoped>
.page-error {
  background: #f0f2f5;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .img {
    margin-right: 80px;
    height: 360px;
    width: 100%;
    max-width: 430px;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    background-size: contain;
    background-image: url($_OSS + '/images/500.svg');
  }
  .content {
    h1 {
      color: #434e59;
      font-size: 72px;
      font-weight: 600;
      line-height: 72px;
      margin-bottom: 24px;
    }
    .desc {
      color: rgba(0, 0, 0, 0.45);
      font-size: 20px;
      line-height: 28px;
      margin-bottom: 16px;
    }
  }
}
</style>
