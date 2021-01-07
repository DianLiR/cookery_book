<template>
  <div class="CourseDetail">
    CourseDetail
    <span>{{ banner_id }}</span>
  </div>
</template>

<script>
export default {
  name: 'CourseDetail',
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
.CourseDetail {
}
</style>
