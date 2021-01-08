<template>
  <div class="related_suggestion">
    <van-cell :value="notes.length + '个作品'">
      <template #title>
        <span class="custom-title">大家做的这道菜</span>
        <van-tag type="danger">{{ rate }}分</van-tag>
      </template>
    </van-cell>
    <div class="list_box">
      <ol class="list">
        <rel-sug-item v-for="item in notes" :info="item" :key="item.id" />
      </ol>
    </div>
  </div>
</template>

<script>
import RelSugItem from './RelSugItem.vue'
export default {
  components: { RelSugItem },
  name: 'RelatedSuggestion',
  props: ['notes', 'rate']
}
</script>

<style lang="less" scoped>
.related_suggestion {
  .custom-title {
    margin-right: 5px;
  }
  .list_box {
    width: 100%;
    border: 1px solid #000;
    .list {
      width: calc(200px * 2);
      display: flex;
      li {
        width: 200px;
        border: 1px solid #000;
      }
    }
  }
}
</style>
