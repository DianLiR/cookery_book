<template>
  <div class="Recommend">
    <span>{{ info.title }}</span>
    <template v-for="item in info.list">
      <rec-item v-if="item.type !== '3'" :key="item.r.id" :info="item" />
    </template>
  </div>
</template>

<script>
import RecItem from '@/components/RecItem'
export default {
  name: 'Recommend',
  components: { RecItem },
  props: ['info'],
  created() {
    // infos = this.info
  }
}
</script>

<style scoped lang="less">
.Recommend {
  span {
    font-size: 22px;
  }
}
</style>
