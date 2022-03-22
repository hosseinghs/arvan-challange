export default {
  namespaced: true,
  state: () => ({
    isVisible: false,
    notif: {
      color: '',
      title: '',
    },
    timer: 5000,
  }),
  mutations: {
    SET_IS_VISIBLE(state, isVisible) {
      state.isVisible = isVisible
    },
    SET_NOTIF(state, notifConfig) {
      Object.assign(state.notif, notifConfig)
    },
    SET_TIMER(state, timer) {
      state.timer = timer
    },
  },
  actions: {
    notify({ commit }, { config, timer }) {
      if (timer === 0) return
      commit('SET_NOTIF', config)
      commit('SET_TIMER', timer)
      commit('SET_IS_VISIBLE', true)
      if (timer === -1) return
      setTimeout(() => {
        commit('SET_IS_VISIBLE', false)
      }, timer)
    },
  },
}