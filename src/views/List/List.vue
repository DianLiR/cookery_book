<template>
  <div class="list_box">
    <van-nav-bar title="菜谱分类">
      <template #right>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar>
    <van-skeleton :row="15" v-if="isShowlist" />
    <div class="list_content" v-else>
      <van-tree-select
        :height="'calc(100vh - (46px + 50px))'"
        :items="items"
        :main-active-index.sync="active"
      >
        <template #content>
          <template v-for="(item, index) in list_data.cs">
            <list-item v-if="active === index" :key="index" :info="item" />
          </template>
          <!--  <template v-for="(item, index) in list_data.cs">
            <div v-if="active === index" :key="index">
              {{ item.name }}
              <div v-for="items in item.cs" :key="items.id">
                {{ items.id }}
                <div v-for="lll in items.cs" :key="lll.id">{{ lll.name }}</div>
              </div>
            </div>
          </template> -->
        </template>
      </van-tree-select>
    </div>
    <!--  <van-sidebar v-model="activeKey">
        <van-sidebar-item
          v-for="item in list_data"
          :key="item.id"
          :title="item.name"
        />
      </van-sidebar>
      <van-list v-model="loading"></van-list> -->
    <!-- <list-content :info="list_data" />
    </div> -->
  </div>
</template>

<script>
import ListItem from '../../components/ListDetail/ListItem.vue'
export default {
  components: { ListItem },
  name: 'List',
  data() {
    return {
      list_data: null,
      // activeKey: 0,
      loading: true,
      active: 0,
      items: null,
      isShowlist: true
    }
  },
  created() {
    // this.getList()
    const localistdata = JSON.parse(localStorage.getItem('list_data'))
    if (localistdata && localistdata.expire > Date.now()) {
      this.get_local()
    } else {
      this.get_axios()
    }
  },
  mounted() {},
  methods: {
    get_local() {
      console.log('读取本地')
      let loca_list_data = JSON.parse(localStorage.getItem('list_data'))
      this.isShowlist = false
      this.list_data = loca_list_data.lists_data
      this.items = loca_list_data.items_data
    },
    get_axios() {
      this.axios({
        url: '/recipe/catalogs'
      }).then(res => {
        console.log('读取ajax')
        this.list_data = res.data.result
        this.isShowlist = false
        let items_data = res.data.result.cs.map(item => {
          return { text: item.name }
        })
        this.items = items_data
        localStorage.setItem(
          'list_data',
          JSON.stringify({
            expire: Date.now() + 1 * 30 * 60 * 1000,
            lists_data: res.data.result,
            items_data
          })
        )
      })
    }
  }
}
</script>

<style lang="less" scoped>
.list_box {
  /deep/ .van-nav-bar__content {
    background-color: #f7f8fa;
  }
  /deep/.van-tree-select__content {
    flex: 3;
  }
  // /deep/.van-tree-select {
  // height: calc(100vh - (46px + 50px)) !important;

  // display: flex;
  // .box_left {
  //   min-width: 80px;
  //   border: 1px solid #000;
  // }
  // .van-sidebar {

  //   .van-sidebar-item {
  //     padding: 14px 12px;
  //   }
  // }
  // .list_content {
  // }
  // }
}
</style>
