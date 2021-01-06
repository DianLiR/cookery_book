<template>
  <div class="Home">
    <van-sticky>
      <van-search
        placeholder="搜索菜谱、食材等"
        shape="round"
        show-action
        @click="toSearch"
      >
        <template #action>
          <van-icon name="label-o" size="30" tab="span" @click="toSort" />
        </template>
      </van-search>
    </van-sticky>
    <div class="content">
      <div class="header_swiper">
        <van-swipe :autoplay="3000" :height="220" :show-indicators="false">
          <van-swipe-item v-for="item in homeData.header.dsps" :key="item.d.id">
            <van-image
              fit="cover"
              :src="item.d.i"
              :alt="item.accessibility_text"
            />
          </van-swipe-item>
        </van-swipe>
      </div>
      <div class="header_channels">
        <van-grid :column-num="5" :border="false">
          <van-grid-item
            v-for="item in homeData.header.channels"
            :key="item.id"
            :icon="item.icon"
            :text="item.title"
          />
        </van-grid>
      </div>
      <hot-events :data="homeData.header.hot_events" />
      <recommend :info="homeData.features_list" />
    </div>
  </div>
</template>

<script>
import HotEvents from '@/components/HotEvents'
import Recommend from '@/components/Recommend'
export default {
  name: 'Home',
  components: { Recommend, HotEvents },
  data() {
    return {
      homeData: null
    }
  },
  created() {
    if (!localStorage.getItem('homeData')) {
      this.axios({
        method: 'get',
        url: '/home',
        dataType: 'json'
      }).then(res => {
        console.log('读取ajax')
        this.homeData = res.data.result
        localStorage.setItem('homeData', JSON.stringify(res.data.result))
      })
      return
    }
    console.log('读取本地')
    this.homeData = JSON.parse(localStorage.getItem('homeData'))
    // }
  },
  methods: {
    toSort() {
      console.log('to分类')
    },
    toSearch() {
      console.log('to搜索')
    }
  }
}
</script>

<style lang="less" scoped>
.Home {
  .content {
    padding: 0 10px;
  }
  /deep/ .van-search__action {
    line-height: 0;
  }

  .header_swiper {
    //padding: 20px;
    border-radius: 10px;
    //width: 90%;
    margin: 10px auto;
    height: 220px;
    overflow: hidden;
  }
}
</style>
