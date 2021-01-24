<template>
  <div id="app">
    <!-- <keep-alive><router-view /></keep-alive> -->
    <!-- <router-view /> -->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>
//
<script>
// localStorage.setItem(
//   'user_data',
//   JSON.stringify([
//     {
//       // A66666: {
//       u_name: '小明',
//       u_account: 'A66666',
//       u_password: 'A123456',
//       desc: '你好，我是小明',
//       favorites: ['2978310', '3055780']
//       // }
//     },
//     {
//       // A66667: {
//       u_name: '小黄',
//       u_account: 'A66667',
//       u_password: 'A123457',
//       desc: '你好',
//       favorites: ['3055768']
//       // }
//     }
//   ])
// )
//
// created() {
localStorage.setItem('browse_calendar', JSON.stringify([]))
// },
</script>
<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // color: #2c3e50;
}
</style>
