export default {
  namespaced: true,

  state: () => ({
    isModalVisible: false,
    navigationItems: [
      {
        id: 1,
        name: 'article',
        route: '/article',
      },
      {
        id: 2,
        name: 'new-article',
        route: 'article/create',
      },
    ],
  }),

  mutations: {
    SET_MODAL_STATE(state, bool) {
      state.isModalVisible = bool
    },
  },

  actions: {
    setModalState({ commit }, bool) {
      commit('SET_MODAL_STATE', bool)
    },
  },
}
