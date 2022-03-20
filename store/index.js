export default {
  namespaced: true,

  state: () => ({
    isModalVisible: false,
    navigationItems: [
      {
        id: 1,
        name: 'Articles',
        route: '/article',
      },
      {
        id: 2,
        name: 'New Articles',
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
