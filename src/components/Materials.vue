<template>
  <div class="materials" ref="materials">
    <!-- <van-sticky :offset-top="46" :container="materials">
       <van-divider
        :style="{
          fontSize: '18px',
          color: 'black',
          borderColor: 'black',
          padding: '0 10px',
          margin: '0'
        }"
      >
    <div class="title">食材清单</div>
    <!-- </van-divider>
    </van-sticky> -->
    <ul class="list">
      <li v-for="(item, index) in checklist" :key="index">
        <span @click="toLink(item)" :style="{ color: item.tu ? 'green' : '' }">
          {{ item.title }}
        </span>
        <span>{{ item.note }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Materials',
  props: ['checklist'],
  data() {
    return {
      materials: null
    }
  },
  mounted() {
    // this.materials = this.$refs.materials
  },
  methods: {
    toLink(info) {
      if (info.tu) {
        this.$router.push({
          name: 'EventPage',
          params: { id: info.title, name: info.title, url: info.tu }
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.materials {
  // margin: 10px 0;
  border: 1px solid #666666;
  border-radius: 10px;
  overflow: hidden;
  .title {
    text-align: center;
    height: 30px;
    line-height: 30px;
    background-color: #666666;
    color: #fff;
    font-size: 18px;
  }
  /deep/.van-sticky {
    background-color: white;
  }
  span {
    font-size: 18px;
  }
  .list {
    padding: 5px 0;
    li {
      display: flex;
      width: 80%;
      border-bottom: 1px solid #cccccc;
      margin: auto;
      padding-top: 5px;
      justify-content: space-between;
      &:last-child {
        border: none;
      }
    }
  }
}
</style>
