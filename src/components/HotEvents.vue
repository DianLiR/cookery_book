<template>
  <div class="HotEvents">
    <!--    <van-cell value="更多" is-link @click="toActivity()">-->
    <van-cell value="更多" is-link>
      <template #title>
        <span class="custom-title">{{ data.title }}</span>
      </template>
    </van-cell>

    <div class="scroll_box">
      <van-swipe :loop="false" :width="250" :show-indicators="false">
        <van-swipe-item
          v-for="item in data.events"
          :key="item.id"
          @click="toActivity(item)"
        >
          <div>
            <img :src="item.image" alt="item.name" />
            <span>{{ item.name }}</span>
          </div>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HotEvents',
  props: ['data'],
  methods: {
    toActivity(info) {
      this.$router.push({
        name: 'EventPage',
        params: { id: info.id, name: info.name, url: info.url }
      })
    }
  }
}
</script>

<style scoped lang="less">
.HotEvents {
  .scroll_box {
    //height: 160px;

    /deep/.van-swipe-item {
      & > div {
        padding: 0 5px;
      }
      img {
        border-radius: 10px;
        display: block;
        width: 100%;
        margin-bottom: 15px;
      }
    }
  }

  /deep/ .van-cell {
    padding: 10px 0;
  }

  .custom-title {
    font-size: 16px;
    //font-weight: 700;
  }
}
</style>
