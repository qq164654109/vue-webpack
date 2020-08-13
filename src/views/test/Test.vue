<template>
  <div class="test">
    <test-item title="列表优化">
      <test-list-optimize></test-list-optimize>
    </test-item>
    <test-item title="列表动画">
      <test-transition></test-transition>
    </test-item>
  </div>
</template>

<script>
  import TestListOptimize from './TestListOptimize';
  import TestTransition from './TestTransition';

  export default {
    components: {
      TestItem: {
        functional: true,
        props: ['title'],
        render(h, {props, children}) {
          return (
            <div class="test-item">
              <div class="tit">{props.title}</div>
              <div class="cont">{children}</div>
            </div>
          )
        }
      },
      TestListOptimize,
      TestTransition
    }  
  };
</script>

<style lang="scss" scoped>
.test {
  min-height: 100vh;
  background-color: #f5f5f5;
  &::before {
    content: '';
    display: table;
  }
  .test-item {
    margin: 10px 10px 0;
    background-color: #fff;
    border-radius: 6px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    .tit {
      height: 45px;
      padding: 0 20px;
      font-size: 16px;
      font-weight: bold;
      color: $color-white;
      line-height: 45px;
      background-color: $color-main;
      border-radius: 6px 6px 0 0;
    }
    .cont {
      padding: 0 20px;
      overflow: hidden;
    }
  }
}
</style>