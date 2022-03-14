import { WarningGenerator } from '~/models/warning'
export default {
  namespaced: true,
  state: () => ({
    warningState: false,
    warningConfig: new WarningGenerator(),
  }),
  mutations: {
    SET_WARNING_STATE(state, bool) {
      state.warningState = bool
    },
    SET_WARNING_CONFIG(state, config) {
      state.warningConfig = Object.assign({}, config)
    },
  },
  actions: {
    setWarningState({ commit }, bool) {
      commit('SET_WARNING_STATE', bool)
    },
    generateWarning({ commit }, config) {
      commit('SET_WARNING_CONFIG', config)
      commit('SET_WARNING_STATE', true)
    },
  },
}
