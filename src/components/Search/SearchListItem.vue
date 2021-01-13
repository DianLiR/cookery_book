<template>
  <div class="search_list_item" @click="toDetail(info.id)">
    <div class="item_image">
      <van-tag type="success" v-if="info.ecs" mark>独家</van-tag>
      <van-image
        lazy-load
        :src="info.img"
        fit="cover"
        radius="10px"
        height="100%"
      />
    </div>
    <div class="item_content">
      <span class="title">{{ info.n }}</span>
      <span class="score">{{ info.rate + '分✦' + info.recommend_label }}</span>
      <div class="tags" v-if="info.recipe_list_tags[0]">
        <van-tag
          :color="item.background_end_color"
          :text-color="item.text_color"
          v-for="item in info.recipe_list_tags"
          :key="item.index"
        >
          {{ item.text }}
        </van-tag>
      </div>
      <div class="author">
        <van-image :src="info.a.p" round width="1em" />
        <span class="name van-ellipsis">{{ info.a.n }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchListItem',
  props: ['info'],
  methods: {
    toDetail(id) {
      this.$router.push({ name: 'details', params: { id } })
    }
  }
}
</script>

<style lang="less" scoped>
.search_list_item {
  // border: 1px solid #000;
  margin-bottom: 10px;
  display: flex;
  .item_image {
    position: relative;
    flex: 1;
    max-height: 100px;
    .van-tag {
      position: absolute;
      left: 5px;
      top: 5px;
      z-index: 98;
    }
  }
  .item_content {
    flex: 1.5;
    padding: 0 5px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    & > * {
      width: 100%;
    }
    .score {
      font-size: 12px;
      color: @gold75;
    }
    .author {
      display: flex;
      align-items: center;
      color: @gold75;
      .name {
        margin-left: 4px;
      }
    }
  }
}
</style>
