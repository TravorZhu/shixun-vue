
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    token: '',
    type: ''
  },
  mutations: {
    update (state, token, type) {
      state.token = token
      state.type = type
      sessionStorage.token = token
      sessionStorage.type = type
    },
    set_token (state, token) {
      state.token = token
      sessionStorage.token = token
    },
    del_token (state) {
      state.token = ''
      sessionStorage.removeItem('token')
      state.type = ''
      sessionStorage.removeItem('type')
    }
  }
})

export default store
