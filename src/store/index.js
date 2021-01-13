import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    mall_data: null //商城数据
  },
  mutations: {
    MallUpdate(state, data) {
      state.mall_data = data
    }
  },
  actions: {},
  modules: {}
})
