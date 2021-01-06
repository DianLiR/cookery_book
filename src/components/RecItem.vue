<template>
  <div class="rec_item">
    <div class="name_box">
      <!-- 用户信息-->
      <van-image
        :src="info.a.p"
        fit="cover"
        height="30"
        lazy-load
        round
        width="30"
      />
      <span title="name">{{ info.an }}</span>
      <span title="lv">LV.{{ info.a.lvl }}</span>
    </div>
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
export default {
  name: 'RecItem',
  props: ['info'],
  created() {
    // console.log(this.info)
  }
}
</script>

<style lang="less" scoped>
.rec_item {
  margin: 15px 0;
  border: 1px solid transparent;

  .name_box {
    display: flex;
    align-items: center;

    span[title='name'] {
      margin: 0 5px;
    }

    span[title='lv'] {
      color: #cebd6b;
      font-style: italic;
      font-size: 10px;
    }
  }

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
    color: #9e9e9e;
    font-size: 12px;
  }
}
</style>
