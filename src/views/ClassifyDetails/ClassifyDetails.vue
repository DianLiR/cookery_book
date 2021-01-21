<template>
  <div class="classify">
    <van-sticky>
      <van-nav-bar title="豆果美食" left-arrow @click-left="$router.back()" />
      <div class="or">
        <ol>
          <li
            v-for="item in orData"
            :key="item.value"
            :class="{ active: item.value == or }"
            @click="toogleV(item.value)"
          >
            {{ item.text }}
          </li>
          <!-- <li>综合</li>
              <li>销量</li>
              <li>价格</li>
              <li>新品</li> -->
        </ol>
      </div>
    </van-sticky>

    <div class="content">
      <van-loading v-if="showload" />
      <van-list v-else>
        <ShopCard
          v-for="(item, index) in resData"
          :key="index"
          :url="item.ti"
          :title="item.t"
          :price="item.p"
          :de_price="item.op"
          :desc="item.des"
        />
      </van-list>
    </div>
  </div>
</template>

<script>
import ShopCard from '../../components/ShopCard.vue'
export default {
  components: { ShopCard },
  name: 'ClassifyDetails',
  data() {
    return {
      or: 0,
      type: this.$route.params.type,
      resData: null,
      showload: true,
      orData: [
        {
          text: '综合',
          value: 0
        },
        {
          text: '销量',
          value: 1
        },
        {
          text: '价格',
          value: 2
        },
        {
          text: '新品',
          value: 4
        }
      ]
    }
  },
  created() {
    this.getData()
  },
  methods: {
    toogleV(v) {
      console.log(v)
      this.or = v
      this.getData()
    },
    getData() {
      this.showload = true
      this.axios({
        url: '/shop/list',
        method: 'get',
        params: {
          id: this.type,
          or: this.or
        }
      }).then(res => {
        this.showload = false
        this.resData = res.data.result.ps
        console.log(res.data.result.ps)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.classify {
  /deep/.van-icon-arrow-left {
    color: black;
  }
  /deep/.shop_title {
    font-size: 16px;
    font-weight: 700;
  }
  .van-list {
    margin-top: 15px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 0 5px;
    /deep/.van-list__loading {
      width: 100%;
    }
  }
  .or {
    background-color: white;
    ol {
      display: flex;
      height: 40px;
      border-bottom: 1px solid #ccc;
      align-items: center;
      justify-content: space-around;
      .active {
        color: red;
      }
    }
  }
  .content {
    .van-loading {
      margin-top: 15px;
      text-align: center;
    }
  }
}
</style>
