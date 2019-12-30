<template>
  <div class="container">
    <div class="login-container">
    <img class="wbk" src="../../assets/wbk.png" />
    <el-form size="mini" ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">智慧校园</h3>
      </div>

      <el-form-item prop="loginName">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="loginName"
          v-model="loginForm.loginName"
          placeholder="用户名"
          name="loginName"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
      <el-form-item prop="loginName">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-select
          ref="schoolCode"
          v-model="loginForm.schoolCode"
          placeholder="学校"
          name="schoolCode"
          auto-complete="on"
        >
          <el-option v-for="(item, i) in schoolCodeList" :key="i" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">登录</el-button>
      <div class="tips">

      </div>

    </el-form>
    </div>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
import { getSchoolCodeList } from '@/api/userApi.js'
export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback()
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        loginName: '',
        password: '',
        schoolCode: ''
      },
      loginRules: {
        loginName: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      schoolCodeList: []
    }
  },
  mounted() {
    getSchoolCodeList().then(res => {
      this.schoolCodeList = res.data
    })
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then(res => {
            this.$router.addRoutes(res)
            this.$router.push({ path: this.redirect || '/dashboard' })
            this.loading = false
          }).catch((err) => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  position: relative;
  .el-input {
    display: inline-block;
    width: 80%;
    height: 40px;
    .el-input__inner {
      height: 40px;
    }
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      color: $light_gray;
      caret-color: $cursor;
    }
  }
  .el-select {
    display: inline-block;
    width: 80%;
    height: 40px;
    .el-input {
      width: 100%;
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;
.container {
  min-height: 100%;
  width: 100%;
  background-image: url("../../assets/login-bg.jpg");
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center center;
  background-size: cover;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .login-container {
    width: 815px;
    height: 779px;
    align-self: center;
    display: flex;
    justify-content: center;
    flex-direction: column;
    .wbk {
      position: absolute;
      top: 0px;
      right: 0px;
      bottom: 0px;
    }
    .login-form {
      position: relative;
      width: 350px;
      align-self: center;

    }

    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;
      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }

    .svg-container {
      padding: 6px 0px 6px 10px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }

    .title-container {
      position: relative;

      .title {
        font-size: 26px;
        color: $light_gray;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold;
      }
    }

    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }
  }
}

</style>
