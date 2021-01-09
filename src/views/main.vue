<template>
  <div class="main">
    <div class="main_box">
      <keep-alive><router-view /></keep-alive>
    </div>
    <van-tabbar
      v-model="active"
      active-color="#1e90ff"
      inactive-color="#747d8c"
    >
      <van-tabbar-item
        v-for="(item, index) in tabbarDate"
        :key="index"
        :icon="item.icon"
        :name="item.name"
        replace
        :to="item.name"
      >
        {{ item.title }}
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'Main',
  // computed: {
  //   active() {
  //     return this.$route.name
  //   }
  // },
  data() {
    return {
      active: this.$route.name || 'Home',
      // active: 'Home',
      tabbarDate: [
        {
          title: '首页',
          icon: 'home-o',
          name: 'Home',
          path: '/home'
        },
        {
          title: '列表',
          icon: 'orders-o',
          name: 'List',
          path: '/list'
        },
        {
          title: '商城',
          icon: 'shop-o',
          name: 'Shopping',
          path: '/shopping'
        },
        {
          title: '我的',
          icon: 'user-o',
          name: 'User',
          path: '/user'
        }
      ]
    }
  }
}
</script>
<style lang="less">
.main {
  .main_box {
    box-sizing: border-box;
    padding-bottom: 50px;
  }

  .main_tabbar {
    height: 50px;
  }
}
</style>
