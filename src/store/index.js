import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    forks: []
  },
  getters: {
  },
  mutations: {
    SET_FORKS (state, forks) {
      state.forks = forks
    }
  },
  actions: {
    async getForks ({ commit }, params) {
      const url = 'https://api.github.com/repos/vuejs/core/forks'
      fetch(url)
        .then(response => response.json())
        .then(forks => {
          commit('SET_FORKS', forks)
        })
    }
  },
  modules: {
  }
})
