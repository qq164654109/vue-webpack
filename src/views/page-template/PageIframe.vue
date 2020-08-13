<template>
  <iframe :src="src" class="iframe" ref="iframe"></iframe>
</template>

<script>
  export default {
    props: {
      src: {
        type: String,
        default: ''
      }
    }
  };
</script>

<style lang="scss" scoped>
  .iframe {
    width: 100%;
    height: 100%;
    border: 0;
    overflow: hidden;
  }
</style>
