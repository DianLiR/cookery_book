import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import _ from 'lodash'
Vue.prototype._ = _
// import { swiper, swiperSlide } from 'vue-awesome-swiper'
import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.use(VueAwesomeSwiper /* { default options with global component } */)

import 'swiper/swiper-bundle.css'
import 'swiper/components/pagination/pagination.min.css'

import Vant from 'vant'
import 'vant/lib/index.less'
import { Lazyload } from 'vant'
Vue.use(Vant).use(Lazyload, {
  lazyComponent: true
})

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
library.add(fas, fab)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

// Vue.filter('remoR', url => {
//   return url.replace(/[^\d]/g, '')
// })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
