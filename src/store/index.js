import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    mall_data: null, //商城数据,
    u_data: ''
  },
  mutations: {
    u_data_login(state, data) {
      state.u_data = data
    }
  },
  actions: {},
  modules: {}
})
