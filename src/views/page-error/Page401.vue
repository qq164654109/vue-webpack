<template>
  <div class="page-error">
    <div class="img"
         :style="`background-image: url('${file}/images/401.svg');`"></div>
    <div class="content">
      <h1>401</h1>
      <div class="desc">抱歉，你无权访问该页面</div>
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
