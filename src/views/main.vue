<template>
  <div class="main">
    <div class="main_box">
      <router-view />
    </div>
    <van-tabbar v-model="active" active-color="green" inactive-color="#606468">
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
  data() {
    return {
      active: 'Home',
      tabbarDate: [
        {
          title: '首页',
          icon: 'home-o',
          name: 'Home',
          path: '/home'
        },
        {
          title: '课堂',
          icon: 'video-o',
          name: 'Study',
          path: '/study'
        },
        {
          title: '商城',
          icon: 'shop-o',
          name: 'Shopping',
          path: '/shopping'
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
