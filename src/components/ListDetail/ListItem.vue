<template>
  <div class="list_item">
    <div v-for="item in info.cs" :key="item.id" class="item">
      <van-image
        :src="item.image_url"
        v-if="item.image_url"
        @click="toA(item.name)"
        lazy-load
      />
      <div class="items">
        <!-- {{ items.name }} -->
        <span v-for="items in item.cs" :key="items.id" @click="toA(items.name)">
          {{ items.name }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ListItem',
  props: ['info'],
  methods: {
    toA(val) {
      this.$router.push({ name: 'Search', params: { value: val } })
    }
  }
}
</script>

<style lang="less" scoped>
.list_item {
  .item {
    padding: 5px 10px;
    .van-image {
      border-radius: 8px;
      overflow: hidden;
    }
    .items {
      padding: 5px 0;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      align-content: space-between;
      span {
        min-width: 90px;
        padding: 5px;
        text-align: center;
        border-radius: 5px;
        border: 1px solid @bayWharf;
        margin-top: 5px;
        margin-right: 5px;
        &:nth-of-type(3n) {
          // margin-right: 0;
        }
      }
    }
  }
}
</style>
