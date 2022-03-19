export default {
  namespaced: true,

  state: () => ({
    isModalVisible: false,
    navigationItems: [
      {
        id: 1,
        name: 'All Articles',
        route: 'admin/articles',
      },
      {
        id: 2,
        name: 'New Article',
        route: 'admin/create',
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
