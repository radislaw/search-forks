import getForks from '@/api/getForks'
import { MESSAGES, STATES } from '@/api/apiService'

const SET_FORKS = 'SET_FORKS'
const SET_CURRENT_STATE = 'SET_CURRENT_STATE'
const SET_MESSAGE = 'SET_MESSAGE'

export default {
  namespaced: true,
  state: () => ({
    forks: [],
    currentState: STATES.IDLE,
    message: ''
  }),
  mutations: {
    [SET_FORKS] (state, payload) {
      state.forks = payload
    },
    [SET_CURRENT_STATE] (state, payload) {
      state.currentState = payload
    },
    [SET_MESSAGE] (state, payload) {
      state.message = payload
    }
  },
  actions: {
    async fetchForks ({ commit }, data = '') {
      commit(SET_CURRENT_STATE, STATES.FETCHING)
      commit(SET_FORKS, [])

      const [owner, repo] = data.split('/')

      if (!owner || !repo) {
        commit(SET_CURRENT_STATE, STATES.ERROR)
        commit(SET_MESSAGE, MESSAGES.WRONG_FORMAT)
        return
      }

      try {
        const response = await getForks({
          owner,
          repo
        })
        commit(SET_CURRENT_STATE, STATES.SUCCESS)
        commit(SET_MESSAGE, MESSAGES.SUCCESS)
        if (response.data.length === 0) {
          commit(SET_CURRENT_STATE, STATES.EMPTY)
          commit(SET_MESSAGE, MESSAGES.EMPTY_REQUEST)
        } else {
          commit(SET_FORKS, response.data)
        }
      } catch (e) {
        commit(SET_CURRENT_STATE, STATES.ERROR)
        if (e.status === 404) {
          commit(SET_MESSAGE, MESSAGES.NOT_FOUND)
        } else {
          commit(SET_MESSAGE, MESSAGES.ERROR)
          throw e
        }
      }
    },
    clearState ({ commit }) {
      commit(SET_CURRENT_STATE, STATES.IDLE)
      commit(SET_MESSAGE, MESSAGES.DEFAULT)
    }
  }
}
