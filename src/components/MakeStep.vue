<template>
  <div class="makestep">
    <!-- <van-collapse v-model="activeNames"> -->
    <!-- <van-collapse-item title="烹饪步骤" name="1"> -->
    <!-- <h3>烹饪步骤</h3> -->
    <ol>
      <li v-for="(item, index) in step" :key="index">
        <span class="step">步骤 {{ item.position + '/' + step.length }}</span>
        <van-image :src="item.image" radius="8" />
        <span class="text">{{ item.content }}</span>
      </li>
    </ol>
    <!-- </van-collapse-item> -->
    <!-- </van-collapse> -->
  </div>
</template>

<script>
export default {
  name: 'Makestep',
  props: ['step'],
  data() {
    return {
      activeNames: ['1']
    }
  }
}
</script>

<style lang="less" scoped>
.makestep {
  // margin: 15px 0;
  color: black;

  h3 {
    margin: 5px 0;
  }
  ol li {
    margin: 15px 0;
    .step {
      display: block;
      padding: 5px 0;
      font-size: 14px;
    }
    .text {
      letter-spacing: 1px;
      white-space: pre-line;
    }
  }
}
</style>
