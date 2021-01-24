<template>
  <div class="browsing_history">
    <van-nav-bar
      title="最近浏览"
      left-text="返回"
      @click-left="$router.back()"
      right-text="按钮"
      left-arrow
      @click-right="DeleAll"
    >
      <template #right><van-icon name="delete-o" size="20" /></template>
    </van-nav-bar>
    <template v-if="local_data.length == 0">
      <van-empty
        class="custom-image"
        image="https://img.yzcdn.cn/vant/custom-empty-image.png"
        description="暂无最近浏览菜谱"
      />
    </template>
    <template v-else>
      <div class="local_list">
        <van-list>
          <search-list-item
            v-for="item in local_data"
            :key="item.cook_id"
            :id="item.cook_id"
            :ecs="0"
            :img="item.photo_path"
            :n="item.title"
            :rate="item.rate"
            :recommend_label="item.recommend_label"
            :recipe_list_tags="item.recipe_list_tags"
            :ap="item.user.user_photo"
            :an="item.user.nick"
          />
        </van-list>
      </div>
    </template>
  </div>
</template>

<script>
import SearchListItem from '../../components/Search/SearchListItem.vue'
export default {
  components: { SearchListItem },
  name: 'BrowsingHistory',
  data() {
    return {
      local_data: JSON.parse(window.localStorage.getItem('browse_calendar'))
    }
  },
  created() {
    console.log('11')
    this.local_data = JSON.parse(window.localStorage.getItem('browse_calendar'))
  },
  methods: {
    DeleAll() {
      this.local_data = []
      // localStorage.removeItem('browse_calendar')
      localStorage.setItem('browse_calendar', JSON.stringify([]))
    }
  }
}
</script>

<style lang="less" scoped>
.local_list {
  padding: 10px;
}
</style>
