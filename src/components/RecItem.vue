<template>
  <div class="rec_item" @click="toDetail(info.id)">
    <!--    <div class="name_box">-->
    <!--      &lt;!&ndash; 用户信息&ndash;&gt;-->
    <!--      <van-image-->
    <!--        :src="info.a.p"-->
    <!--        fit="cover"-->
    <!--        height="30"-->
    <!--        lazy-load-->
    <!--        round-->
    <!--        width="30"-->
    <!--      />-->
    <!--      <span title="name">{{ info.an }}</span>-->
    <!--      <span title="lv">LV.{{ info.a.lvl }}</span>-->
    <!--    </div>-->
    <author-info :src="info.a.p" :name="info.an" :lv="info.a.lvl" />
    <span class="title_box">
      <!-- 标题 -->
      {{ info.n }}
    </span>
    <div class="img_box">
      <!-- 图片-->
      <van-image
        :src="info.img"
        fit="cover"
        height="100%"
        lazy-load
        width="100%"
      />
    </div>
    <div class="rec_label">{{ info.recommend_label }}</div>
  </div>
</template>

<script>
import AuthorInfo from '@/components/AuthorInfo'
export default {
  name: 'RecItem',
  components: { AuthorInfo },
  props: ['info'],
  created() {
    // console.log(this.info)
  },
  methods: {
    toDetail(id) {
      // let id = url.replace(/[^\d]/g, '')
      // let str = url.match(/m\/(\S*)\?/)[1]
      this.$router.push({ name: 'details', params: { id } })
    }
  }
}
</script>

<style lang="less" scoped>
.rec_item {
  margin: 15px 0;
  border: 1px solid transparent;

  .title_box {
    display: block;
    font-size: 18px;
    padding: 10px 0;
  }

  .img_box {
    box-sizing: border-box;
    overflow: hidden;
    width: 100%;
    height: 200px;
    border-radius: 12px;
    //border: 1px solid #000;
  }
  .rec_label {
    margin: 5px 0;
    color: @bayWharf;
    font-size: 12px;
  }
}
</style>
