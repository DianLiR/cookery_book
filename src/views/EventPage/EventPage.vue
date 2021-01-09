<template>
  <div class="event_page">
    <van-sticky>
      <van-nav-bar
        :title="info.name"
        left-arrow
        right-text="按钮"
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
      :options="options"
      title="立即分享给好友"
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
    this.info = { name: this.$route.params.name, url: this.$route.params.url }
  },
  methods: {
    onSelect(option) {
      this.$toast(option.name)
      this.showShare = false
    }
  }
}
</script>

<style lang="less" scoped>
.event_page {
  .act_iframe {
    box-sizing: border-box;
    height: calc(100vh - 46px);
    overflow: hidden;
    position: relative;

    iframe {
      position: absolute;
      right: -20px;
      top: 0;
      border: none;
      width: calc(100% + 20px);
      height: 100%;
    }
  }
}
</style>
