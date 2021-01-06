<template>
  <div class="event_page">
    <van-sticky>
      <van-nav-bar
        :title="info.name"
        right-text="按钮"
        left-arrow
        @click-left="$router.back()"
        @click-right="showShare = true"
      >
        <template #right>
          <van-icon name="share-o" size="20px" />
        </template>
      </van-nav-bar>
    </van-sticky>

    <div class="act_iframe">
      <iframe :src="info.url"></iframe>
    </div>
    <van-share-sheet
      v-model="showShare"
      title="立即分享给好友"
      :options="options"
      @select="onSelect"
    />
  </div>
</template>

<script>
export default {
  name: 'EventPage',
  data() {
    return {
      info: '',
      showShare: false,
      options: [
        { name: '微信', icon: 'wechat' },
        { name: '微博', icon: 'weibo' },
        { name: 'QQ', icon: 'qq' }
      ]
    }
  },
  created() {
    this.info = this.$route.params.info
  },
  methods: {
    onSelect(option) {
      this.$toast(option.name)
      this.showShare = false
    }
  }
}
</script>

<style scoped lang="less">
.event_page {
  .act_iframe {
    box-sizing: border-box;
    height: calc(100vh - 46px);
    iframe {
      border: none;
      width: 100vw;
      height: 100%;
    }
  }
}
</style>
