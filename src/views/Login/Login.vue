<template>
  <div class="login_box">
    <van-nav-bar
      :title="page_status ? '登录' : '注册'"
      :right-text="page_status ? '注册' : '登录'"
      left-arrow
      @click-left="$route.back()"
      @click-right="page_status = !page_status"
    />
    <div class="content">
      <div class="title">
        <van-image
          src="https://i1.douguo.com//upload/banner/1576635352.png"
          width="50%"
        />
      </div>
      <template v-if="page_status">
        <div class="login">
          <van-field
            v-model="user_name"
            label="用户名"
            format-trigger="onBlur"
            placeholder="请输入用户名"
            key="login"
          />
          <van-field
            v-model="user_password"
            label="密码"
            format-trigger="onBlur"
            placeholder="请输入密码"
            type="password"
          />
        </div>
        <div class="sub_btn">
          <van-button round block type="info">
            登录
          </van-button>
        </div>
      </template>
      <template v-else>
        <div class="registered">
          <van-field
            v-model="user_name_re"
            label="用户名"
            format-trigger="onBlur"
            placeholder="请输入注册用户名"
          />
          <van-field
            v-model="user_an_re"
            label="账号"
            format-trigger="onBlur"
            placeholder="请输入注册账号"
          />
          <van-field
            v-model="user_password_re"
            label="密码"
            format-trigger="onBlur"
            placeholder="请输入注册密码"
            type="password"
          />
        </div>
        <div class="sub_btn">
          <van-button round block type="info" @click="registered">
            注册
          </van-button>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      page_status: 'true',
      user_name: '',
      user_password: '',
      user_name_re: '',
      user_password_re: '',
      user_an_re: ''
    }
  },
  methods: {
    ver_an() {
      // 帐号是否合法(字母开头，允许5-16字节，允许字母数字下划线组合
      // let an_reg = /^[a-zA-Z]\w{4,15}$/
      // 例子      // justin      // justin1989      // justin_666
      // 密码强度校验，最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
      // let pas_reg = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z]).*$/
      // 例子
      // Kd@curry666
    },

    registered() {
      // let an_reg =
      let anR = /^[a-zA-Z]\w{4,15}$/.test(this.user_an_re)
      let pasR = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z]).*$/.test(
        this.user_password_re
      )
      console.log(anR, pasR)
    }
  }
}
</script>

<style lang="less" scoped>
.login_box {
  overflow: hidden;
  .content {
    height: calc(100vh - 46px);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: wrap column;
    margin-top: -80px;
    .title {
      padding: 15px 0;
      text-align: center;
    }
    .login,
    .registered {
      border-color: transparent skyblue transparent pink;
      border-style: solid;
      border-width: 3px;
      padding: 5px 0;
      width: 70%;
    }
    .sub_btn {
      // border: 1px solid #000;
      margin-top: 20px;
      width: 70%;
    }
  }
}
</style>
