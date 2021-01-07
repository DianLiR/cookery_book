<template>
  <div class="mall_detail">
    <span>{{ banner_id }}</span>
  </div>
</template>

<script>
export default {
  name: 'MallDetail',
  data() {
    return {
      banner_id: ''
    }
  },
  created() {
    this.banner_id = this.$route.params.id
  }
}
</script>

<style scoped lang="less">
.mall_detail {
}
</style>
