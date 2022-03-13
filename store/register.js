import { User } from '~/models/user'
import { registerUserApi } from '~/services/register'
export default {
  namespaced: true,

  state: () => ({
    user: new User(),
  }),

  mutations: {
    SET_USER_DATA(state, { k, v }) {
      state.user[k] = v
    },

    CLEAR_USER_STATE(state) {
      state.user = new User()
    },
  },

  actions: {
    setUserData({ commit }, { k, v }) {
      commit('SET_USER_DATA', { k, v })
    },

    clearUserState({ commit }) {
      commit('CLEAR_USER_STATE')
    },

    /* -------------------------------------------------------------------------- */
    /*                                  api call                                  */
    /* -------------------------------------------------------------------------- */

    async registerUser({ state }) {
      const newUser = state.user
      async function apiCall(api) {
        console.log(await registerUserApi(api, newUser))
      }
      return await this.$apiCaller(apiCall)()
    },
  },
}
