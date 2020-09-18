<template>
  <div>
    <el-button @click="a"></el-button>
    <!-- <test-from :formData.sync="formData"></test-from> -->
  </div>
</template>

<script>
  export default {
    data() {
      return {
        b: false,
        formData: {
          name: '',
          age: '',

        }
      }
    },
    created() {
      this.$watch('aa', {
        handler: val => {
          console.log(this.formData)
        },
        immediate: true
      })
    },
    methods: {
      a() {
        this.b = !this.b
      }
    }
  }
</script>