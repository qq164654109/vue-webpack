<template>
  <div class="test">
    <el-card header="长列表优化">
      <test-list-optimize></test-list-optimize>
    </el-card>
    <el-card header="队列动画">
      <test-transition></test-transition>
    </el-card>
    <el-card header="文件切片上传及断点续传">
      <test-upload></test-upload>
    </el-card>
  </div>
</template>

<script>
  import TestListOptimize from './TestListOptimize';
  import TestTransition from './TestTransition';
  import TestUpload from './TestUpload';

  export default {
    components: {
      TestListOptimize,
      TestTransition,
      TestUpload
    }
  };
</script>

<style lang="scss" scoped>
.test {
  min-height: calc(100vh - #{$default-topbar-height});
  padding: 20px 20px 0;
  background-color: #f5f5f5;
  box-sizing: border-box;
  .el-card {
    margin-bottom: 20px;
  }
}
</style>