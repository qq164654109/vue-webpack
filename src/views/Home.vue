<template>
  <div class="home">
    <el-button @click="a">asdasd</el-button>
  </div>
</template>

<script>
import { getUserMenu } from '@/api/auth';

export default {
  name: 'home',
  methods: {
    a() {
      getUserMenu({
        baseURL: '/api'
      }).then(data => {
        console.log(data)
      })
    }
  }
}
</script>
