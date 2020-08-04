<template>
  <div id="login" class="full of-hidden" :class="{'active': form.username || form.password}">
    <div class="login-form-wrap of-hidden cursor-pointer">
      <div class="login-tit txt-center">登录</div>
      <el-form class="login-form" ref="form" :model="form" :rules="rules">
        <el-form-item prop="username" :class="{'focus': usernameFocus}">
          <div class="placeholder no-select pos-absolute">用户名</div>
          <el-input id="username" v-model="form.username" @focus="onFocus('username')" @blur="onBlur('username')"></el-input>
        </el-form-item>
        <el-form-item prop="password" :class="{'focus': passwordFocus}">
          <div class="placeholder no-select pos-absolute">密码</div>
          <el-input id="password" v-model="form.password" @focus="onFocus('password')" @blur="onBlur('password')"></el-input>
        </el-form-item>
        <el-button class="btn full" @click="onSubmit">登录</el-button>
      </el-form>
      <div class="login-tip txt-center">
        没有账号？
        <em>注册</em>
      </div>
    </div>
    <div class="bg"></div>
    <div class="bubble"></div>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex';

  export default {
    layout: 'blank',
    data() {
      return {
        usernameFocus: false,
        passwordFocus: false,
        form: {
          username: '',
          password: ''
        },
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: ['blur', 'change'] },
          ],
          password: [
            { required: true, message: '请输入密码', trigger: ['blur', 'change'] },
          ]
        }
      }
    },
    methods: {
      ...mapMutations('user', ['setUser']),
      routeJump() {
        const redirect = this.$route.query.redirect;
        const jumpPath = redirect ? redirect : '/';
        this.$router.push(jumpPath);
      },
      onSubmit() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.setUser({
              name: this.form.username,
              token: this.form.password
            });
            this.routeJump();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      onFocus(inputName) {
        this[inputName + 'Focus'] = true;
      },
      onBlur(inputName) {
        this[inputName + 'Focus'] = !!this.form[inputName];
      }
    }
  }
</script>

<style lang="scss" scoped>
#login {
  position: relative;
  height: 100vh;
  &.active {
    .bg {
      left: 0;
      top: 0;
    }
    .bubble {
      transform: translateY(-52%) translateX(10%);
    }
  }
  .login-form-wrap {
    position: relative;
    width: 380px;
    padding: 0 40px;
    margin: 18vh auto 0;
    background-color: #fff;
    border-radius: 6px;
    box-shadow: 4px 4px 14px rgba(0, 0, 0, 0.1);
    z-index: 1;
    .login-tit {
      letter-spacing: 1px;
      font-size: 24px;
      margin-top: 65px;
      margin-bottom: 50px;
    }
    .login-form {
      .el-form-item {
        position: relative;
        margin-bottom: 40px;
        &.focus {
          &:after {
            width: 100%;
          }
          .placeholder {
            color: $color-main;
            transform: translateY(-30px);
          }
          /deep/.el-form-item__error {
            display: none;
          }
        }
        &:after {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          width: 0;
          height: 2px;
          background-image: linear-gradient(160deg, $color-main 20%, rgb(139, 108, 250) 80%);
          transition: all .4s $transEffect;
          z-index: 2;
        }
        &.is-error /deep/.el-input__inner {
          border-color: #DCDFE6;
        }
        .placeholder {
          left: 12px;
          top: 8px;
          line-height: 1.5;
          font-size: 16px;
          color: #6C757D;
          transition: all .4s $transEffect;
          z-index: 3;
        }
        .el-input {
          outline: none;
          font-size: 16px;
        }
        /deep/ {
          .el-input__inner {
            border-radius: 0;
            border-left: none;
            border-top: none;
            border-right: none;
            border-width: 2px;
            box-shadow: none;
            &:focus {
              border-color: #DCDFE6;
            }
          }
          .el-form-item__error {
            top: 8px;
            right: 0;
            left: auto;
            padding: 7px 6px;
            background-color: #F56C6C;
            color: #fff;
            border-radius: 4px;
            box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1);
            &::before {
              content: '';
              position: absolute;
              width: 0;
              height: 0;
              left: -12px;
              top: 7px;
              border-top: 6px solid transparent;
              border-right: 6px solid #F56C6C;
              border-bottom: 6px solid transparent;
              border-left: 6px solid transparent;
            }
          }
        }
      }
      .btn {
        color: #fff;
        font-size: 16px;
        margin-bottom: 50px;
        background-image: linear-gradient(160deg, $color-main 0%, rgb(139, 108, 250) 100%);
        &:focus, &:hover, &:active {
          border-color: none;
          outline: none;
        }
      }
    }
    .login-tip {
      font-size: 12px;
      margin-bottom: 100px;
    }
  }
  .bg {
    position: absolute;
    width: 130%;
    height: 130%;
    left: -30%;
    top: -30%;
    z-index: -1;
    background-image: linear-gradient(160deg, $color-main 20%,rgb(139, 108, 250) 80%);
    transition: all 1s;
  }
  .bubble {
    position: absolute;
    top: 0;
    right: 0;
    width: 70%;
    height: 0;
    transform: translateX(25%) translateY(-63%);
    padding-top: 70%;
    border-radius: 50%;
    box-shadow: -4px 4px 12px rgba(255, 255, 255, 0.2);
    transition: 1s $transEffect;
  }
}
</style>