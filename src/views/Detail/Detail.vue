<template>
  <div class="Detail">
    <van-nav-bar left-arrow @click-left="$router.back()">
      <template #right>
        <van-icon name="more-o" size="20px" />
      </template>
    </van-nav-bar>
    <template v-if="isShow">
      <div class="box">
        <div class="bg">
          <van-image :src="recipe.original_photo_path" />
        </div>
        <div class="content">
          <h2>{{ recipe.title }}</h2>
          <author-info
            :style="{ margin: '10px 0' }"
            :src="recipe.author_photo"
            :name="recipe.author"
          />
          <br />
          <div class="info">
            <span v-if="recipe.hq">精品</span>
            <span>
              <font-awesome-icon :icon="['fas', 'eye']" color="#fed022"/>
              {{ recipe.views_count_text }}
            </span>
            <span>收藏{{ recipe.favo_counts_text }}</span>
            <span>学做{{ recipe.rate_count }}</span>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
// import DetailHeader from '@/components/DetailHeader'
import AuthorInfo from '@/components/AuthorInfo'
export default {
  name: 'Detail',
  components: { AuthorInfo },
  // components: { DetailHeader },
  data() {
    return {
      banner_id: null,
      recipe: null,
      isShow: false
    }
  },
  created() {
    this.banner_id = this.$route.params.id
    this.getDetail()
  },
  methods: {
    getDetail() {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        // overlay: true,
        duration: 0,
        loadingType: 'spinner'
      })
      this.axios({
        url: '/recipe/detail',
        method: 'get',
        params: {
          id: this.banner_id
        }
      }).then(res => {
        if (res.status === 200) {
          this.$toast.clear()
          // console.log(res)
          this.recipe = res.data.result.recipe
          this.isShow = true
          console.log(this.recipe)
        } else {
          this.$toast(res.statusText)
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.Detail {
  .box {
    .bg {
      box-sizing: border-box;
      max-height: 400px;
      z-index: 0;
    }
    .content {
      position: relative;
      top: -20px;
      left: 0;
      background-color: #fff;
      border-radius: 20px 20px 0 0;
      padding: 10px 15px;
      min-height: 150px;
      h2 {
        margin: 0;
      }
      .info {
        display: flex;
        width: 80%;
        margin: auto;
        border: 1px solid #000;
        //border: 1px solid #000;
        justify-content: space-around;
        > span {
          border: 1px solid #000;
        }
      }
    }
  }
}
</style>
