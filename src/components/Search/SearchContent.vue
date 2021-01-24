<template>
  <div class="search_content">
    <!-- <ingredients-info :ingData="info.ie" v-if="info.ie" /> -->
    <van-card
      v-if="info.ie"
      @click="toA(info.ie)"
      centered
      :desc="info.ie.d"
      :title="info.ie.n"
      :thumb="info.ie.i"
    />
    <van-list>
      <search-list-item
        v-for="item in info.list"
        :key="item.r.id"
        :id="item.r.id"
        :ecs="item.r.ecs"
        :img="item.r.img"
        :n="item.r.n"
        :rate="item.r.rate"
        :recommend_label="item.r.recommend_label"
        :recipe_list_tags="item.r.recipe_list_tags"
        :ap="item.r.a.p"
        :an="item.r.a.n"
      />
    </van-list>
  </div>
</template>

<script>
import SearchListItem from './SearchListItem.vue'
export default {
  components: { SearchListItem },
  name: 'SearchContent',
  props: ['info'],
  methods: {
    toA(ie) {
      // console.log('222')
      this.$router.push({
        name: 'EventPage',
        params: {
          id: ie.n,
          name: ie.n,
          url: ie.u
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.search_content {
  padding: 0 10px;
}
</style>
