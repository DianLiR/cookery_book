import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    homeData: null
  },
  mutations: {
    HomeUpdate(state, home_data) {
      state.homeData = home_data
    }
  },
  actions: {},
  modules: {}
})
