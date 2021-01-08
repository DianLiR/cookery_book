<template>
  <div class="AuthorInfo" :style="styles">
    <!-- 用户信息-->
    <van-image :src="src" fit="cover" height="35" lazy-load round width="30" />
    <span title="name">{{ name }}</span>
    <span title="lv" v-if="lv">LV.{{ lv }}</span>
  </div>
</template>

<script>
export default {
  name: 'AuthorInfo',
  props: {
    src: String,
    name: String,
    lv: Number,
    styles: {
      type: Object,
      default: null
    }
  }
}
</script>

<style scoped lang="less">
.AuthorInfo {
  display: flex;
  align-items: center;

  span[title='name'] {
    margin: 0 5px;
  }

  span[title='lv'] {
    color: @goldenSand;
    font-style: italic;
    font-size: 10px;
  }
}
</style>
