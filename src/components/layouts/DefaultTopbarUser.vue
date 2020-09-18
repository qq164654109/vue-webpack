<template>
  <div class="default-topbar-user">
    <el-dropdown trigger="click" @command="onCommand">
      <img class="avatar" width="40" height="40" :src="avatarSrc" alt="">
      <el-dropdown-menu slot="dropdown">
        <dropdown-item label="我的主页" icon="icon-dengluye-zhanghao1"></dropdown-item>
        <dropdown-item label="设置" icon="icon-shezhi"></dropdown-item>
        <dropdown-item label="退出" icon="icon-tuichu"></dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
  import img_male from '@/assets/img/male.png';
  import img_female from '@/assets/img/female.png';
  
  const DropdownItem = {
    functional: true,
    props: ['label', 'icon'],
    render(h, {props}) {
      return (
        <el-dropdown-item command={props.label}>
          <svg-icon name={props.icon}></svg-icon>
          <span style="vertical-align: middle; margin-left: 5px;">{props.label}</span>
        </el-dropdown-item>
      )
    }
  };

  export default {
    components: {
      DropdownItem
    },
    computed: {
      avatarSrc() {
        return img_male;
      }
    },
    methods: {
      onCommand(commond) {
        switch(commond) {
          case '我的主页':
            break;
          case '设置':
            break;  
          case '退出':
            this.$store.dispatch('user/Logout');
            break; 
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
.default-topbar-user {
  width: 40px;
  height: 40px;
}
.avatar {
  outline: none;
  cursor: pointer;
}
</style>