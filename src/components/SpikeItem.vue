<template>
  <div class="spike_item">
    <van-image :src="com.i" radius="8" />
    <div class="text_name van-multi-ellipsis--l2">{{ com.n }}</div>
    <div class="price">
      <span>￥{{ com.p }}</span>
      <div v-if="com.op > 0">￥{{ com.op }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SpikeItem',
  props: ['com']
}
</script>

<style lang="less" scoped>
.spike_item {
  .text_name {
    font-size: 12px;
  }
  .price {
    display: flex;
    margin-top: 10px;
    span {
      color: red;
    }
    div {
      color: @gold75;
      transform: scale(0.7);
      text-decoration: line-through;
    }
  }
}
</style>
