<template>
  <div class="page-error">
    <div class="img"
      style=" background-image: url(https://zjwater-public-files.oss-cn-hangzhou.aliyuncs.com/qtj/packageStatic/pc/static/images/98e19050-88a1-43e2-ab35-eb79e6b6ef06.svg);"></div>
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
@import "./style.scss";
</style>
