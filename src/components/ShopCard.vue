<template>
  <div class="shop_card" @click="toDetail">
    <div class="shop_img">
      <van-image :src="url" lazy-load width="100%" height="100%">
        <template v-slot:loading>
          <van-loading type="spinner" size="20" />
        </template>
        <template v-slot:error>加载失败</template>
      </van-image>
      <div class="img_desc van-ellipsis ">{{ desc }}</div>
    </div>
    <span class="title van-multi-ellipsis--l2">{{ title }}</span>
    <div class="price">
      <span class="p">￥{{ price }}</span>
      <span class="d_p">￥{{ de_price }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShopCard',
  props: ['url', 'title', 'price', 'de_price', 'desc', 'id'],
  methods: {
    toDetail() {
      console.log('1')
      let id = this.id
      this.$router.push({ name: 'malldetail', params: { id } })
    }
  }
}
</script>

<style lang="less" scoped>
.shop_card {
  // border: 1px solid #000;
  flex: 0 0 calc(50% - 20px);
  margin-bottom: 20px;
  overflow: hidden;
  .title {
    font-size: 14px;
    margin: 5px 0;
  }
  .price {
    display: flex;
    .p {
      color: red;
      font-weight: 600;
    }
    .d_p {
      text-decoration: line-through;
      color: @bayWharf;
      font-size: 14px;
      transform: scale(0.8);
      transform-origin: bottom center;
    }
  }
  .shop_img {
    border-radius: 8px;
    overflow: hidden;
    .van-image {
      vertical-align: middle;
    }
    .img_desc {
      height: 35px;
      padding: 0 5px;
      line-height: 35px;
      font-size: 14px;
      background-color: #dadada;
    }
  }
}
</style>
