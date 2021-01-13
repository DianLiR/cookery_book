<template>
  <div class="search">
    <van-sticky>
      <form action="/">
        <van-search
          v-model.trim="value"
          show-action
          placeholder="请输入搜索关键词"
          shape="round"
          clearable
        >
          <template #action>
            <van-icon name="search" size="20px" />
          </template>
          <template #left>
            <van-icon
              name="arrow-left"
              color="skyblue"
              @click="$router.back()"
              size="20px"
            />
          </template>
        </van-search>
      </form>
    </van-sticky>
    <div class="local_search" v-if="!value && search_history != ''">
      <span>搜索记录</span>
      <ul class="popular_list">
        <li v-for="(item, i) in search_history" :key="i" @click="P_s_v(item)">
          {{ item }}
          <van-icon name="cross" @click.stop="deleSH(item)" />
        </li>
      </ul>
    </div>
    <div class="popular_searches" v-if="!value">
      <span>热门搜索</span>
      <ul class="popular_list">
        <li
          v-for="(item, i) in popular_searches"
          :key="i"
          @click="P_s_v(item.name)"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
    <search-content v-else :info="search_results" />
  </div>
</template>

<script>
import SearchContent from '../../components/Search/SearchContent.vue'
export default {
  components: { SearchContent },
  name: 'Search',
  data() {
    return {
      value: '',
      popular_searches: '',
      // related_search: ''
      search_results: '',
      search_history: JSON.parse(localStorage.getItem('SearchRecords'))
    }
  },
  created() {
    if (this.$route.params.value) {
      // console.log(this.$route.params)
      this.value = this.$route.params.value
    }
    this.get_popular_searches()
    // this.getlocaData()
    this.getRes = this._.debounce(this.get_search_results, 1000)
  },
  watch: {
    value(n, o) {
      if (n || o != '') {
        // this.get_search_results(n || o)
        this.getRes()
        // this.getlocaData()
      }
    }
    // '$route.path':function(newVal, oldVal){
    // }
  },

  methods: {
    // getlocaData() {
    //   this.search_history = JSON.parse(
    //     localStorage.getItem('SearchRecords')
    //   ) || ['']
    // },
    deleSH(i) {
      this.search_history = this._.without(this.search_history, i)
      // this.search_history = this.search_history.filter(item => item !== i)
      localStorage.setItem('SearchRecords', JSON.stringify(this.search_history))
      // localStorage.setItem('SearchRecords', JSON.stringify([a]))
    },
    setlocaData(val) {
      // let str = localStorage.getItem('SearchRecords')
      // let arr = JSON.parse(str)
      // let arr1 = _.uniq([...arr, val])

      if (this.search_history) {
        localStorage.setItem(
          'SearchRecords',
          JSON.stringify(this._.uniq([val, ...this.search_history]))
        )
      } else {
        localStorage.setItem('SearchRecords', JSON.stringify([val]))
      }
      this.search_history = JSON.parse(localStorage.getItem('SearchRecords'))
    },
    P_s_v(value) {
      this.search_results = ''
      this.value = value
    },
    get_popular_searches() {
      // get_热门_搜索
      this.axios({
        url: 'http://img.zzyyl.xyz/suggests.json'
      }).then(res => {
        // console.log('热门_搜索', res)
        this.popular_searches = res.data.result.suggests
      })
    },
    get_search_results() {
      // get_搜索_结果
      if (this.value == null || this.value == '') {
        return
      }

      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        // overlay: true,
        duration: 0,
        loadingType: 'spinner'
      })
      this.axios({
        url: '/recipe/list',
        method: 'get',
        params: {
          keyword: this.value
        }
      }).then(res => {
        this.$toast.clear()
        // console.log('get_搜索_结果', res)
        this.search_results = res.data.result
        this.setlocaData(this.value)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.popular_searches,
.local_search {
  padding: 10px;
  .popular_list {
    overflow: hidden;
    li {
      margin: 5px 2px;
      border-radius: 10px;
      float: left;

      padding: 6px;
      text-align: center;
      background-color: #ececec;
      min-width: 70px;
    }
  }
}
.local_search {
  li {
    position: relative;
    .van-icon-cross {
      float: right;
      // position: absolute;
    }
  }
}
.search {
  .van-search {
    // z-index: 1000;
    padding: 10px 5px;
    .van-icon-arrow-left {
      padding: 0 5px;
    }
    .van-search__action {
      line-height: 1em;
    }
  }
}
</style>
