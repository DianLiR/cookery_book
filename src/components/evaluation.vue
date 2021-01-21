<template>
  <div class="evaluation">
    <div class="header">
      <div class="badge">
        <div class="content">
          <van-image fit="cover" :src="info.a.p" width="100%" />
        </div>
        <div class="child" v-if="info.a.verified_image">
          <van-image :src="info.a.verified_image" width="100%" />
        </div>
      </div>
      <span class="name">{{ info.a.n }}</span>
    </div>
    <div class="le_content">{{ info.des }}</div>
    <div class="le_image">
      <div class="le_image_item" v-for="(item, index) in info.is" :key="index">
        <van-image :src="item" width="100%" height="100%" fit="cover" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'evaluation',
  props: ['info']
}
</script>

<style lang="less" scoped>
.evaluation {
  padding: 5px 10px;
  .header {
    display: flex;
    // border: 1px solid #000;
    align-items: center;
    .badge {
      width: 40px;
      height: 40px;
      // border: 1px solid #000;
      position: relative;
      .child {
        width: 15px;
        height: 15px;
        position: absolute;
        right: -5px;
        bottom: 0;
      }
      .content {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        overflow: hidden;
      }
    }
    .name {
      margin-left: 5px;
    }
  }
  .le_content {
    // margin: 5px 0;
    padding: 5px 0;
    // border: 1px solid #000;
  }
  .le_image {
    display: flex;
    justify-content: space-between;
    .le_image_item {
      width: 80px;
      height: 80px;
      border-radius: 5px;
      overflow: hidden;
      // border: 1px solid #000;
    }
  }
}
</style>
