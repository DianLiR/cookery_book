<template>
  <div class="Detail">
    <van-nav-bar
      placeholder
      left-arrow
      @click-left="$router.back()"
      fixed
      z-index="100"
    >
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
          <!-- 正文内容 -->
          <!-- 标题 -->
          <h2>{{ recipe.title }}</h2>

          <div class="info">
            <!-- tag标签 -->
            <div v-if="recipe.hq">
              <van-tag type="primary" plain>精品</van-tag>
              <!-- <font-awesome-icon icon="star" color="#ff7f50" /> -->
            </div>
            <div>
              <font-awesome-icon icon="eye" color="#ff7f50" />
              {{ recipe.views_count_text }}
            </div>
            <div>
              <font-awesome-icon icon="heart" color="#ff7f50" />
              {{ recipe.favo_counts_text }}
            </div>
          </div>
          <!-- 用户信息 -->
          <author-info
            :styles="{ margin: '15px 0' }"
            :src="recipe.author_photo"
            :name="recipe.author"
          />
          <!-- 美食故事 -->
          <span v-if="recipe.cookstory" class="cookstory">
            {{ recipe.cookstory | story_format }}
          </span>
          <!-- 制作难度&时间 -->
          <div
            v-if="recipe.cook_time && recipe.cook_difficulty"
            class="cook_info"
          >
            <div>
              <div class="info_img">
                <van-image :src="recipe.cook_time_image" width="100%" />
              </div>
              <span>{{ recipe.cook_time }}</span>
            </div>
            <div>
              <div class="info_img">
                <van-image :src="recipe.cook_difficulty_image" width="100%" />
              </div>
              <span>{{ recipe.cook_difficulty }}</span>
            </div>
          </div>
          <!-- 折叠面板 -->
          <van-collapse v-model="activeNames">
            <van-collapse-item title="制作材料" name="1">
              <!-- 制作材料 -->
              <materials :checklist="recipe.major" />
            </van-collapse-item>
            <van-collapse-item title="制作步骤" name="2">
              <!-- 制作步骤 -->
              <make-step :step="recipe.cookstep" />
            </van-collapse-item>
          </van-collapse>
          <span class="create_time">发布于{{ recipe.create_time }}</span>
          <!-- <related-suggestion :rate="recipe.rate" :notes="recipe.notes" /> -->
        </div>
      </div>
    </template>
  </div>
</template>

<script>
// import DetailHeader from '@/components/DetailHeader'
import AuthorInfo from '@/components/AuthorInfo'
import Materials from '@/components/Materials'
import MakeStep from '@/components/MakeStep.vue'
// import RelatedSuggestion from '@/components/RelatedSuggestion/RelatedSuggestion.vue'
export default {
  name: 'Detail',
  components: { AuthorInfo, Materials, MakeStep },
  filters: {
    story_format(v) {
      // 网址(支持端口和"?+参数"和"#+参数)
      // 网址(支持端口和"?+参数"和"#+参数)
      var reg = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g

      // let str = v.replace(reg, '')
      // console.log(str)
      return v.replace(reg, '')
    }
  },
  // components: { DetailHeader },
  data() {
    return {
      banner_id: null,
      recipe: null,
      isShow: false,
      activeNames: ['1']
    }
  },
  created() {
    this.banner_id = this.$route.params.id
    this.isShow = false
    this.getDetail()
  },
  // activated() {
  //   this.banner_id = this.$route.params.id
  //   this.isShow = false
  //   this.getDetail()
  // },
  methods: {
    set_local() {},
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
        // console.log(res)
        if (res.status === 200) {
          this.$toast.clear()
          // console.log(res)
          let re = res.data.result.recipe
          this.recipe = re
          this.isShow = true
          // console.log(this.recipe)
          let local = JSON.parse(localStorage.getItem('browse_calendar'))
          // let data = this._.uniq(local)
          // console.log(data)
          let data = [re, ...local]
          // console.log('data=>', data)
          // let aa = this._.uniqBy(data, 'cook_id')
          // console.log('aa=>', aa)
          localStorage.setItem(
            'browse_calendar',
            // JSON.stringify([...local, re])
            JSON.stringify(this._.uniqBy(data, 'cook_id'))
          )
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
      /deep/.van-cell,
      /deep/.van-collapse-item__content {
        padding: 12px 0;
      }
      // /deep/.van-collapse-item__content {
      //   padding: 12px 0;
      // }
      .create_time {
        display: block;
        padding: 10px 0;
        color: #858585;
        font-size: 12px;
      }
      .cookstory {
        display: block;
        letter-spacing: 1px;
        line-height: 20px;
        border: 1px dashed #666666;
        padding: 10px;
        border-radius: 20px 0 20px;
      }
      .cook_info {
        display: flex;
        margin: auto;
        width: 80%;
        // height: 45px;
        padding: 15px 0;
        justify-content: space-between;
        .info_img {
          width: 45px;
        }
        div {
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: 115px;
          span {
            margin-left: 5px;
          }
        }
      }
      h2 {
        margin: 0;
      }
      .info {
        display: flex;
        width: 55%;
        align-items: center;
        justify-content: space-between;
        margin-top: 5px;
      }
    }
  }
}
</style>
