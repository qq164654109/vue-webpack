<template>
  <div class="page-error">
    <div class="img"></div>
    <div class="content">
      <h1>404</h1>
      <div class="desc">抱歉，你访问的页面不存在</div>
      <div class="actions">
        <router-link :to="{path: $website.auth_path}">
          <el-button type="primary">返回主页</el-button>
        </router-link>
      </div>
    </div>
  </div>
</template>

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
    background-image: url($oss + '/images/98e19050-88a1-43e2-ab35-eb79e6b6ef06.svg');
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
