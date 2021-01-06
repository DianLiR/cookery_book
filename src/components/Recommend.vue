<template>
  <div class="Recommend">
    <span>{{ info.title }}</span>
    <rec-item v-for="item in info.list" :key="item.r.id" :info="item.r" />
  </div>
</template>

<script>
import RecItem from '@/components/RecItem'
export default {
  name: 'Recommend',
  components: { RecItem },
  props: ['info']
}
</script>

<style scoped lang="less">
.Recommend {
  span {
    font-size: 22px;
  }
}
</style>
