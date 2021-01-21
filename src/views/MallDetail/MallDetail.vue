<template>
  <div class="mall_detail">
    <van-nav-bar
      placeholder
      left-arrow
      @click-left="$router.back()"
      fixed
      z-index="100"
    >
      <template #right>
        <van-icon name="more-o" size="20px" />
      </template>
    </van-nav-bar>
    <template v-if="loading">
      <div class="swiper">
        <van-image width="100%" height="100%" />
      </div>
    </template>
    <template v-else>
      <swiper class="swiper" :options="swiperOptions">
        <!-- <swiper-slide v-for="(item, i) in 1" :key="i"> -->
        <!-- </swiper-slide> -->

        <swiper-slide
          v-for="(item, i) in info.p.is"
          :key="i"
          :style="{ backgroundImage: 'url(' + item + ')' }"
        ></swiper-slide>
      </swiper>
    </template>
    <van-skeleton title :row="3" v-if="loading" />
    <div class="title_box" v-else>
      <div class="title">{{ info.p.t }}</div>
      <div class="tag">{{ info.p.des }}</div>
      <div class="price">
        <span class="p">${{ info.p.p }}</span>
        <span class="op" v-if="info.p.op">${{ info.p.op }}</span>
      </div>
      <div class="i">
        <span>{{ info.p.si }}</span>
        <span>{{ info.p.add }}</span>
      </div>
    </div>
    <div class="evaluation" v-if="!loading">
      <van-cell :value="info.p.sos[0] ? '评价' : '评价 (暂无评价)'" />
      <div class="el" v-if="info.p.sos">
        <evaluation v-for="item in info.p.sos" :info="item" :key="item.id" />
      </div>
    </div>
    <div class="detailed" v-if="!loading">
      <van-cell value="店铺信息" />
      <div class="i">
        <div class="image"><van-image :src="info.p.store.l" /></div>
        <div class="name">
          <span>{{ info.p.store.n }}</span>
          <span>{{ info.p.store.sfi }}</span>
        </div>
        <ul class="ss">
          <li v-for="(item, i) in info.p.store.ss" :key="i">
            {{ item.t + ' ' + item.s }}
          </li>
        </ul>
      </div>
    </div>
    <van-goods-action>
      <van-goods-action-icon icon="cart-o" text="购物车" />
      <van-goods-action-icon icon="star" text="已收藏" color="#ff5000" />
      <van-goods-action-button type="warning" text="加入购物车" />
      <van-goods-action-button type="danger" text="立即购买" />
    </van-goods-action>
  </div>
</template>

<script>
import evaluation from '../../components/evaluation.vue'
export default {
  components: { evaluation },
  name: 'MallDetail',
  data() {
    return {
      banner_id: '',
      info: '',
      loading: true,
      swiperOptions: {}
    }
  },

  activated() {
    this.loading = true
    this.getDate()
    console.log('activated')
  },
  methods: {
    getDate() {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        // overlay: true,
        duration: 0,
        loadingType: 'spinner'
      })

      this.axios({
        url: '/shop/detail',
        method: 'get',
        params: {
          id: this.$route.params.id
        }
      }).then(res => {
        if (res.status === 200) {
          this.info = res.data.result
          this.$toast.clear()
          this.loading = false
        } else {
          this.$toast(res.statusText)
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.mall_detail {
  background-color: #e9e9e9;
  margin-bottom: 60px;
  .swiper {
    height: 50vh;
    .swiper-slide {
      background-size: 100%;
      background-repeat: no-repeat;
    }
  }
  .van-skeleton {
    padding: 8px 16px;
  }
  .title_box {
    background-color: white;
    padding: 0 10px 5px;
    .title {
      font-size: 18px;
      padding: 10px 0;
    }
    .tag {
      color: @bayWharf;
      font-size: 14px;
    }
    .price {
      padding: 5px 0;
      .p {
        font-size: 24px;
        color: red;
      }
      .op {
        margin-left: 10px;
        text-decoration: line-through;
        color: @bayWharf;
      }
    }
    .i {
      display: flex;
      color: @bayWharf;
      font-size: 14px;
      justify-content: space-between;
    }
  }
  .evaluation {
    margin: 10px 0;
    background-color: white;
  }
  .detailed {
    background-color: white;
    .i {
      padding: 0 15px;
      display: flex;
      align-items: center;
      height: 60px;
      .image {
        border-radius: 50%;
        width: 50px;
        height: 50px;
        overflow: hidden;
        box-shadow: 0 0 1px 0 #ccc;
      }
      .name {
        height: 100%;
        margin-left: 10px;
        display: flex;
        flex-flow: column wrap;
        justify-content: space-around;
        & span:last-child {
          color: #ccc;
          font-size: 14px;
        }
      }
      .ss {
        margin-left: auto;
      }
    }
  }
}
</style>
