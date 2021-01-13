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
        :info="item.r"
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
