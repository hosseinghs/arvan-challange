// import { addToArr } from '~/utils/general'
import { getArticlesApi } from '~/services/articles'

export default {
  namespaced: true,

  state: () => ({
    articles: {},
  }),

  mutations: {
    SET_ARTICLES_LIST(state, payload) {
      state.articles = Object.assign({}, payload)
    },
  },

  actions: {
    async getArticles({ commit }) {
      async function apiCall(api) {
        const { data, status } = await getArticlesApi(api)
        if (status === 200) commit('SET_ARTICLES_LIST', data)
      }
      return await this.$apiCaller(apiCall)()
    },
    async deleteArticle({ commit }, yechizi) {
      await console.log(yechizi)
    },
  },
}
