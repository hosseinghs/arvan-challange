import { User } from '~/models/user'
import { registerUserApi, loginApi } from '~/services/register'
export default {
  namespaced: true,

  state: () => ({
    user: new User(),
    isLoggedIn: false,
  }),

  mutations: {
    SET_USER_DATA(state, { k, v }) {
      state.user[k] = v
    },

    CLEAR_USER_STATE(state) {
      state.user = new User()
    },

    SET_IS_LOGGED_IN_STATE(state, bool) {
      state.isLoggedIn = bool
    },
  },

  actions: {
    setUserData({ commit }, { k, v }) {
      commit('SET_USER_DATA', { k, v })
    },

    clearUserState({ commit }) {
      commit('CLEAR_USER_STATE')
    },

    setIsLoggedInState({ commit }, bool) {
      commit('SET_IS_LOGGED_IN_STATE', bool)
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

    async login({ state, dispatch }) {
      const user = state.user
      async function apiCall(api) {
        const { data, status } = await loginApi(api, user)
        if (status === 200) {
          localStorage.setItem('authorization', data.user.token)
          localStorage.setItem('admin', data.user.username)
          dispatch('setIsLoggedInState', true)
          return true
        }
      }
      return await this.$apiCaller(apiCall)()
    },
  },
}
