import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    token: ''
  },
  mutations: {
    set_token(state, token) {
      state.token = token
      localStorage.token = token
    },
  }
})

export default store