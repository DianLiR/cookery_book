<template>
  <div class="list_item">
    <div v-for="item in info.cs" :key="item.id" class="item">
      <van-image
        :src="item.image_url"
        v-if="item.image_url"
        @click="toA(item.name)"
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
      justify-content: center;
      align-content: space-between;
      /*父元素常见属性*/
      /*设置主轴的方向*/
      /*flex-direction：  row行,column列*/
      /*设置主轴上的子元素排列方式*/
      /*justify-content： space-around平分,space-between两边贴中间平分,space-evenly每个间距相同*/
      /*设置子元素是否换行*/
      /*flex-wrap：wrap/nowrap*/
      /*设置侧轴上的子元素排列方式（单行）*/
      /*align-items：stretch 拉伸*/
      /*设置侧轴上的子元素的排列方式（多行）*/
      /*align-content：stretch 子元素高度平分父元素高度*/
      /*flex-flow：复合属性，相当于同时设置了 flex-direction 和 flex-wrap*/
      /*子元素常见属性*/
      /*align-self 子元素自己在侧轴的排列方式*/
      /*order 属性定义子项的排列顺序(前后顺序) */
      // border: 1px solid #000;
      span {
        min-width: 70px;
        padding: 5px;
        text-align: center;
        border-radius: 5px;
        border: 1px solid @bayWharf;
        margin-top: 5px;
        margin-right: 5px;
        &:nth-of-type(3n) {
          margin-right: 0;
        }
      }
    }
  }
}
</style>
