import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: JSON.parse(window.sessionStorage.getItem('user')),
    token: JSON.parse(window.sessionStorage.getItem('token'))
  },
  mutations: {
    set_token(state, data) {
      state.token = data
      window.sessionStorage.setItem('token', JSON.stringify(data))
    },
    set_user(state, data) {
      state.user = data
      window.sessionStorage.setItem('user', JSON.stringify(data))
    },
    logout(state) {
      state.token = null
      state.user = null
      window.sessionStorage.removeItem('token')
      window.sessionStorage.removeItem('user')
    }
  },
  actions: {},
  modules: {}
})
