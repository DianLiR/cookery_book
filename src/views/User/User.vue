<template>
  <div class="user">
    <div class="my_bg">
      <van-image
        :src="user_data.user_cover"
        width="100%"
        height="100%"
        fit="cover"
      />
    </div>
    <div class="content">
      <div class="user_photo">
        <van-image :src="user_data.user_photo" width="80%" height="80%" />
      </div>
      <div class="box">
        <div class="user_name">
          {{ user_data.nick }}
        </div>
        <div class="user_info">
          <span class="gender">
            {{ user_data.gender == 2 ? '厨男' : '厨娘' }}
          </span>
          <span>{{ user_data.age }}</span>
          <span class="signature">
            {{
              user_data.introduction ||
                '吃货不是在吃就是在去吃的路上，没时间写签名'
            }}
          </span>
        </div>
        <div class="user_info_a">
          <van-cell-group>
            <van-cell
              :title="item.t"
              :key="item.i"
              is-link
              v-for="item in list_data"
              :to="{ name: item.to }"
            />
          </van-cell-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'User',
  computed: {
    ...mapState(['user', 'token'])
  },
  data() {
    return {
      user_data: '',
      // ss_text: '',
      list_data: [
        { t: '个人资料', i: 0, to: 'BrowsingHistory' },
        { t: '我的收藏', i: 1, to: 'BrowsingHistory' },
        { t: '浏览历史', i: 2, to: 'BrowsingHistory' },
        { t: '安全中心', i: 3, to: 'BrowsingHistory' }
      ]
    }
  },
  created() {},
  activated() {
    this.user_init()
  },
  methods: {
    // ss_text_init() {
    //   let data = this.user_data
    //   this.ss_text = [
    //     { t: '关注', v: data.following_count_text },
    //     { t: '粉丝', v: data.following_count_text },
    //     { t: '经验值', v: data.point_text },
    //     { t: '被收藏', v: data.following_count_text },
    //     { t: '被学做', v: data.following_count_text }
    //   ]
    // },
    user_init() {
      let tokenS = sessionStorage.getItem('token')
      if (!tokenS) {
        this.$toast('请先登录')
        return this.$router.push({ name: 'Login' })
      }
      this.axios({
        url: '/user/info',
        method: 'POST',
        params: {
          id: this.user.user_id
        }
      })
        .then(res => {
          console.log(res)
          if (res.status == 200) {
            this.user_data = res.data.result.user
          }
        })
        .catch(res => {
          this.$dialog
            .confirm({
              message: res.data.state
            })
            .then(() => {
              // on confirm
              this.user_init()
            })
            .catch(() => {
              // on cancel
              this.$router.push({ name: 'Home' })
            })
        })
    }
  }
}
</script>

<style lang="less" scoped>
.user {
  height: calc(100vh - 50px);
  background-color: #f5f5f5;
  box-sizing: border-box;
  .my_bg {
    height: 40vh;
    position: relative;
    overflow: hidden;
    border-radius: 10px;
    top: -10px;
  }
  .content {
    position: relative;
    margin: 0 auto;
    top: -40px;
    background-color: white;
    border-radius: 8px;
    padding: 5px 10px;
    box-sizing: border-box;
    // min-height: 100px;
    width: 85%;
    box-shadow: 1px 1px 4px 0 #ccc;
    .user_photo {
      position: absolute;
      border-radius: 50%;
      left: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: white;
      top: -20%;
      box-shadow: 0 0 5px 0 #ccc;
      transform: translateX(-50%);
      height: 120px;
      width: 120px;
      overflow: hidden;
    }
    .box {
      position: relative;
      .user_name {
        margin-top: 50px;
        text-align: center;
      }
      .user_info {
        // display: flex;
        // width: 50%;
        // justify-content: space-around;
        padding: 5px 0;
        margin: auto;
        width: 100%;
        span {
          padding: 2px 0;
          display: block;
          font-size: 14px;
          width: 100%;
        }
      }
      .user_info_a {
        margin: 10px 0;
      }
    }
  }
}
</style>
