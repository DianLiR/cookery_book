<template>
  <div class="DetailHeader">
    <div class="bg"></div>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailHeader'
}
</script>

<style scoped lang="less">
.DetailHeader {
  .cell {
    display: flex;
    justify-content: space-between;
    height: 45px;
    align-items: center;
  }
}
</style>
