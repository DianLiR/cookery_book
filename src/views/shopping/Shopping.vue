<template>
  <div class="shopping">
    <van-sticky>
      <van-cell title="商城" icon="shop-o" class="head">
        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <template #right-icon>
          <van-icon name="search" />
          <van-icon name="shopping-cart-o" />
        </template>
      </van-cell>
    </van-sticky>
    <van-loading type="spinner" v-if="loading" />
    <template v-else>
      <van-grid :gutter="2" column-num="5" :border="false">
        <van-grid-item
          v-for="item in mall_classification.cs"
          :key="item.id"
          :icon="item.i"
          :text="item.n"
          @click="onCs(item.id)"
        />
      </van-grid>
      <daily-spike :info="mall_classification.rps[0]" />

      <!-- 全部商品 -->
      <van-cell title="全部商品" :border="false" class="shop_title" />
      <van-list
        v-model="list_loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <shop-card
          v-for="(item, i) in list"
          :key="i"
          :url="item.rp.ti"
          :title="item.rp.t"
          :price="item.rp.p"
          :de_price="item.rp.op"
          :desc="item.rp.des"
          :id="item.rp.id"
        />
        <!-- <van-cell :title="item.rp.t" /> -->
      </van-list>
    </template>
  </div>
</template>

<script>
import DailySpike from '../../components/DailySpike.vue'
import ShopCard from '../../components/ShopCard.vue'
export default {
  components: { DailySpike, ShopCard },
  name: 'Shopping',
  data() {
    return {
      mall_classification: null,
      loading: true,

      list: [],
      list_loading: false,
      finished: false,
      start: 0,
      end: 6,
      step: 10
    }
  },
  created() {
    this.getShopData_loca()
    // this.get_shop_data()
  },
  methods: {
    onLoad() {
      // // 异步更新数据
      // // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      // setTimeout(() => {
      //   for (let i = 0; i < 10; i++) {
      //     this.list.push(this.list.length + 1)
      //   }

      //   // 加载状态结束
      //   this.loading = false

      //   // 数据全部加载完成
      //   if (this.list.length >= 40) {
      //     this.finished = true
      //   }
      // }, 1000)
      this.get_shop_data()
      this.start += this.step
      this.end += this.step
      // console.log(this.start, this.end)
    },
    get_shop_data() {
      console.log('get_shop_data==>', this.start, this.end)
      this.axios({
        url: 'http://cookbook.keuaile75.top/peshop',
        method: 'post',

        data: {
          start: this.start,
          end: this.end
        }
      }).then(res => {
        if (res.status == 200) {
          this.list_loading = false
          if (res.data.result.rps.length) {
            this.list.push(...res.data.result.rps)
          } else {
            this.finished = true
          }
        }
      })
    },
    onCs(id) {
      this.$router.push({ name: 'ClassifyDetails', params: { type: id } })
    },
    getShopData_loca() {
      let shopLocal = JSON.parse(localStorage.getItem('shop_data'))
      if (shopLocal && shopLocal.expire > Date.now()) {
        this.mall_classification = shopLocal.data
        this.loading = false
        console.log('true')
      } else {
        this.getShopData_axios()
        console.log('false')
      }
    },
    getShopData_axios() {
      // this.$toast.loading({
      //   message: '加载中...',
      //   forbidClick: true,
      //   // overlay: true,
      //   duration: 0
      // })
      this.axios({
        url: '/shop',
        method: 'get'
      }).then(res => {
        if (res.status == 200) {
          // console.log(res)
          this.mall_classification = res.data.result
          // this.$toast.clear()
          localStorage.setItem(
            'shop_data',
            JSON.stringify({
              expire: Date.now() + 60 * 60 * 1000,
              data: res.data.result
            })
          )
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
.shopping {
  /deep/.shop_title {
    font-size: 16px;
    font-weight: 700;
  }
  .van-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 0 5px;
    /deep/.van-list__loading {
      width: 100%;
    }
  }
  .head {
    border-bottom: 1px solid #eeeeee;
    .van-cell__title {
      font-size: 18px;
    }
    .van-icon {
      font-size: 20px;
    }
    .van-cell {
      align-items: center;
    }
  }
  .van-loading {
    text-align: center;
  }
}
</style>
