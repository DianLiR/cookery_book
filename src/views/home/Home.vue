<template>
  <div class="Home">
    <van-sticky>
      <!-- 顶部 + 搜索栏 -->
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
      <!-- 主体内容 -->
      <div class="header_swiper">
        <!--  顶部轮播图 -->
        <van-swipe :autoplay="3000" :height="220" :show-indicators="false">
          <van-swipe-item v-for="item in homeData.header.dsps" :key="item.d.id">
            <van-image
              :alt="item.accessibility_text"
              :src="item.d.i"
              fit="cover"
            />
          </van-swipe-item>
        </van-swipe>
      </div>
      <div class="header_channels">
        <!-- 分类 -->
        <van-grid :border="false" :column-num="5">
          <van-grid-item
            v-for="item in homeData.header.channels"
            :key="item.id"
            :icon="item.icon"
            :text="item.title"
          />
        </van-grid>
      </div>
      <!-- 热门活动 -->
      <hot-events :data="homeData.header.hot_events" />
      <!--今日推荐-->
      <recommend :info="rec_today" />
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
      homeData: null,
      rec_today: []
    }
  },
  created() {
    if (!localStorage.getItem('homeData')) {
      this.get_axios()
      // return
    } else {
      this.get_local()
    }

    // }
  },
  methods: {
    get_axios() {
      this.axios({
        method: 'get',
        url: '/home',
        dataType: 'json'
      }).then(res => {
        console.log('读取ajax')
        this.homeData = res.data.result
        this.rec_today = res.data.result.features_list
        this.rec_today.list.shift()
        localStorage.setItem('homeData', JSON.stringify(res.data.result))
      })
    },
    get_local() {
      console.log('读取本地')
      let local_data = JSON.parse(localStorage.getItem('homeData'))
      this.rec_today = local_data.features_list
      this.rec_today.list.shift()
      this.homeData = local_data
    },
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
