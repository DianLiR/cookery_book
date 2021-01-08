<template>
  <div class="Home">
    <van-sticky z-index="999">
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
      <div class="c_skeleton" v-if="loading"></div>
      <div v-else class="header_swiper">
        <!-- 顶部轮播图 -->
        <van-swipe :autoplay="3000" :height="220" :show-indicators="false">
          <van-swipe-item
            v-for="item in homeData.header.dsps"
            @click="toDetail(item.d.url)"
            :key="item.d.id"
          >
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
        <van-skeleton :row="6" v-if="loading" style="margin:15px" animate />
        <van-grid :border="false" :column-num="5" v-else>
          <van-grid-item
            v-for="(item, index) in homeData.header.channels"
            :key="item.id"
          >
            <template #default>
              <div
                class="channels_item"
                :style="{ backgroundColor: header_channels_color[index] }"
              >
                <span class="item_title">{{ item.title }}</span>
                <div class="item_img"><img :src="item.icon" /></div>
              </div>
            </template>
          </van-grid-item>
        </van-grid>
      </div>
      <!-- 热门活动 -->
      <div class="c_skeleton" v-if="loading"></div>
      <hot-events v-else :data="homeData.header.hot_events" />

      <!--今日推荐-->
      <recommend :info="rec_today" v-if="rec_today" />
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
      rec_today: null,
      loading: true,
      header_channels_color: [
        '#bad8f1',
        '#d3e4f5',
        '#cfe7f7',
        '#cceaf8',
        '#cee2f5',
        '#bcddb0',
        '#d6e8b7',
        '#e2edbc',
        '#e0ebac',
        '#cee3a6'
      ]
    }
  },
  created() {
    const localHomeDate = JSON.parse(localStorage.getItem('homeData'))
    if (localHomeDate && localHomeDate.expire > Date.now()) {
      this.get_local()
    } else {
      this.get_axios()
    }
  },
  methods: {
    toDetail(url) {
      let id = url.replace(/[^\d]/g, '')
      let str = url.match(/m\/(\S*)\?/)[1]
      this.$router.push({ name: str, params: { id } })
    },

    get_axios() {
      this.axios({
        method: 'get',
        url: '/home'
      }).then(res => {
        this.loading = false
        console.log('读取ajax')
        this.homeData = res.data.result
        this.rec_today = res.data.result.features_list
        this.rec_today.list.shift()
        localStorage.setItem(
          'homeData',
          JSON.stringify({
            expire: Date.now() + 1 * 60 * 60 * 1000,
            data: res.data.result
          })
        )
      })
    },
    get_local() {
      console.log('读取本地')
      let local_data = JSON.parse(localStorage.getItem('homeData'))
      this.loading = false
      this.rec_today = local_data.data.features_list
      this.rec_today.list.shift()
      this.homeData = local_data.data
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
  /deep/.van-sticky--fixed {
    background-color: #fff;
    height: 35px;
    .van-divider {
      margin: 0;
    }
  }
  .content {
    padding: 0 10px;
    .c_skeleton {
      background-color: #f3f4f6;
      width: 100%;
      height: 220px;
    }
  }

  /deep/ .van-search__action {
    line-height: 0;
  }

  .header_channels {
    .channels_item {
      box-sizing: border-box;
      width: 95%;
      height: 80px;
      background-color: skyblue;
      border-radius: 20px 0 20px;
      position: relative;
      .item_img,
      .item_title {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
      }
      .item_title {
        top: 8px;
        font-size: 12px;
        color: gray;
        width: 100%;
        text-align: center;
      }
      .item_img {
        bottom: 2px;
        width: 60%;
        img {
          display: block;
          width: 100%;
        }
      }
    }
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
