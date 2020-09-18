<template>
  <div id="login">
    <div class="content animated flipInX">
      <div class="form-wrap">
        <div class="form-title text-20">
          账号登录
        </div>
        <div class="login-group">
          <el-form ref="form" :model="form" :rules="rules" status-icon :show-message="false">
            <el-form-item prop="username">
              <el-input v-model="form.username" placeholder="用户名">
                <svg-icon slot="prefix" name="icon-dengluye-zhanghao1"></svg-icon>
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input v-model="form.password" type="password" placeholder="密码" @keyup.enter.native="RequestLogin">
                <svg-icon slot="prefix" name="icon-mima"></svg-icon>
              </el-input>
            </el-form-item>
            <el-form-item prop="code">
              <el-input v-model="form.code" class="code-input" placeholder="验证码" @keyup.enter.native="RequestLogin">
                <svg-icon slot="prefix" name="icon-anquan"></svg-icon>
              </el-input>
              <code-render class="code" ref="codeRender" v-model="code" :width="140" :height="40"></code-render>
            </el-form-item>
            <el-form-item prop="remember">
              <el-checkbox v-model="form.remember" :true-label="1" :false-label="0">记住密码</el-checkbox>
            </el-form-item>
            <el-form-item>
              <el-button :disabled="isLogining" type="primary" class="login-btn full-width text-18 text-center" @click="RequestLogin">登录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';
  import qs from 'qs';
  import { getToken } from '@/utils/auth';
  import CodeRender from '@/components/code-render/CodeRender';
  
  export default {
    layout: 'blank',
    components: {
      CodeRender
    },
    data() {
      const validateCode = (rule, value, callback) => {
        if (value.toLowerCase() !== this.code.toLowerCase()) {
          callback(new Error("验证码错误"));
        } else {
          callback();
        }
      }
      return {
        isLogining: false,
        usernameFocus: false,
        passwordFocus: false,
        form: {
          username: '',
          password: '',
          code: '',
          remember: 0,
        },
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: ['blur', 'change'] },
          ],
          password: [
            { required: true, message: '请输入密码', trigger: ['blur', 'change'] },
          ],
          code: [
            { required: true, validator: validateCode, trigger: ['blur', 'change'] }
          ]
        },
        code: ''
      }
    },
    methods: {
      ...mapActions({
        Login: 'user/Login',
        ConfigUserMenu: 'user/ConfigUserMenu'
      }),
      RequestLogin() {
        if (this.isLogining) return;
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.isLogining = true;
            this.Login({
              data: qs.stringify(this.form),
              errorMsg: err => err.response.data.msg
            }).then(() => {
              // 注册异步路由
              this.ConfigUserMenu().then(() => {
                this.routeJump();
              }).catch(() => {
                next({name: 'PageError'});
              })
            }).catch(() => {
              this.refreshCode();
            }).finally(() => {
              this.isLogining = false;
            })
          }
        });
      },
      refreshCode() {
        this.$refs.codeRender.draw();
      },
      routeJump() {
        const redirect = this.$route.query.redirect;
        const jumpPath = redirect ? redirect : '/';
        this.$router.push(jumpPath);
      }
    }
  }
</script>

<style lang="scss" scoped>
@import './login.scss';
</style>