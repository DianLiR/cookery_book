<template>
  <div class="login_box">
    <van-nav-bar
      :right-text="page_status ? '账号密码登录' : '手机验证码登录'"
      left-arrow
      @click-left="toHome"
      @click-right="page_status = !page_status"
    />
    <div class="content">
      <div class="title">
        <!-- <van-image
          src="https://i1.douguo.com//upload/banner/1576635352.png"
          width="50%"
        /> -->
        <span class="ti">登录后才精彩</span>
        <span class="tag">若该手机号未注册，将自动注册成功</span>
      </div>
      <template v-if="page_status">
        <div class="login">
          <van-field
            v-model.trim="v_code.cell_phone"
            label="手机号码"
            format-trigger="onBlur"
            placeholder="请输入手机号"
            key="login"
            clearable
          />
          <van-field
            v-model.trim="v_code.msg"
            center
            clearable
            label="验证码"
            maxlength="6"
            placeholder="请输入验证码"
          >
            <template #button>
              <van-button size="mini" round @click="getV_code">
                发送验证码
              </van-button>
            </template>
          </van-field>
        </div>
        <div class="sub_btn">
          <van-button
            round
            block
            type="info"
            :disabled="v_code.cell_phone == ''"
            @click="us_login"
          >
            登录
          </van-button>
        </div>
      </template>
      <template v-else>
        <div class="registered">
          <van-field
            v-model.trim="register.name"
            label="用户名"
            format-trigger="onBlur"
            placeholder="请输入注册用户名"
            clearable
          />
          <van-field
            v-model.trim="register.account"
            label="账号"
            format-trigger="onBlur"
            placeholder="请输入注册账号"
            clearable
          />
          <van-field
            v-model.trim="register.password"
            label="密码"
            format-trigger="onBlur"
            placeholder="请输入注册密码"
            clearable
            :type="showR_Pass ? 'text' : 'password'"
            :right-icon="showR_Pass ? 'closed-eye' : 'eye-o'"
            @click-right-icon="showR_Pass = !showR_Pass"
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
import { mapMutations } from 'vuex'
export default {
  name: 'Login',
  data() {
    return {
      page_status: 'true',
      showR_Pass: false,
      v_code: {
        cell_phone: '',
        msg: ''
      },
      register: {
        name: '',
        password: '',
        account: ''
      }
    }
  },

  methods: {
    toHome() {
      this.$router.push({ name: 'Home' })
    },
    ...mapMutations(['set_token', 'set_user']),
    getV_code() {
      if (this.v_code.cell_phone == '') {
        this.$toast('请输入手机号码')
      } else {
        let postData = {
          phone: this.v_code.cell_phone
        }
        this.$axios
          .post('/verifycode', this.$qs.stringify(postData))
          .then(res => {
            console.log(res, res.status)
            if (res.status == 200) {
              this.$toast(res.data.result)
            } else {
              this.$toast('获取失败')
            }
          })
      }
    },
    us_login() {
      // var userData = JSON.parse(localStorage.getItem('user_data'))
      // if (this.user_name == null || this.user_password == null) return
      if (this.v_code.cell_phone == '' || this.v_code.msg == '') {
        this.$toast('验证码不能为空')
        return
      }
      console.log(this.v_code.msg, this.v_code.cell_phone)

      this.axios
        .post(
          '/login',
          this.$qs.stringify({
            username: this.v_code.cell_phone,
            captcha: this.v_code.msg
          })
        )
        .then(res => {
          console.log(res)
          if (res.status == 200) {
            this.$store.commit('set_token', res.data.result.token)
            this.$store.commit('set_user', res.data.result.user)
            // this.$toast('登录成功')
            this.$router.push({ name: 'User' })
            this.$toast({
              message: res.data.result.message,
              position: 'top'
            })
          }
        })
        .catch(() => {
          this.$toast('验证码错误')
        })
      // let isT = userData.some(item => {
      //   let n = item.u_account == this.login.name
      //   let p = item.u_password == this.login.password
      //   if (n && p) {
      //     return true
      //   }
      // })
      // if (isT) {
      //   this.$toast.success('登陆成功')
      // } else {
      //   this.$toast.fail('账号/密码错误')
      // }
    },

    registered() {
      // 密码强度校验，最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
      // ;/^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/
      // 例子
      // 帐号是否合法(字母开头，允许5-16字节，允许字母数字下划线组合
      if (this.user_name == '' || this.user_password == '') {
        this.$toast('不能为空')
        return
      }
      // 例子
      let local_user = JSON.parse(localStorage.getItem('user_data'))
      let accR = /^[a-zA-Z]\w{4,15}$/.test(this.register.account)
      let pasR = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).*$/.test(
        this.register.password
      )
      let data = {
        u_name: this.register.name,
        u_account: this.register.account,
        u_password: this.register.password,
        desc: '',
        favorites: []
      }
      // console.log(accR, pasR)
      if (accR && pasR) {
        this.$toast.success('注册成功')
        let users = localStorage.users
        console.log(users)
        // console.log(...this.userData)
        localStorage.setItem('user_data', JSON.stringify([...local_user, data]))
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login_box {
  overflow: hidden;
  // border: 1px solid #000;
  .content {
    // border: 1px solid #000;
    padding: 30px 40px;
    // height: calc(100vh - 46px);

    // margin-top: -80px;
    .title {
      display: flex;
      // border: 1px solid #000;
      flex-flow: wrap column;
      margin-bottom: 30px;
      .ti {
        font-size: 24px;
      }
      .tag {
        margin: 15px 0;
        font-size: 16px;
      }
      // padding: 15px 0;
      // text-align: center;
      // display: flex;
    }
    .login,
    .registered {
      border-color: transparent skyblue transparent pink;
      border-style: solid;
      border-width: 3px;
      // padding: 5px 0;
      // width: 80%;
      /deep/.van-field__label {
        margin-right: 0;
      }
    }
    .sub_btn {
      margin-top: 20px;
    }
  }
}
</style>
