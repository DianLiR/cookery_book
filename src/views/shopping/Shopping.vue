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
    </template>
  </div>
</template>

<script>
import DailySpike from '../../components/DailySpike.vue'
export default {
  components: { DailySpike },
  name: 'Shopping',
  data() {
    return {
      mall_classification: null,
      loading: true
    }
  },
  created() {
    this.getShopData_loca()
  },
  methods: {
    onCs(i) {
      this.$toast(i)
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
