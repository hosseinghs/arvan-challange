// import { addToArr } from '~/utils/general'
import {
  getArticlesApi,
  deleteArticleApi,
  editArticleApi,
  createArticleApi,
} from '~/services/articles'
import { Article } from '~/models/article'

export default {
  namespaced: true,

  state: () => ({
    articles: {},
    article: new Article(),
  }),

  mutations: {
    SET_ARTICLES_LIST(state, payload) {
      state.articles = Object.assign({}, payload)
    },
    SET_ARTICLE_DATA(state, { k, v }) {
      state.article[k] = v
    },
  },

  actions: {
    setArticleData({ commit }, { k, v }) {
      commit('SET_ARTICLE_DATA', { k, v })
    },

    /* -------------------------------------------------------------------------- */
    /*                                  api calls                                 */
    /* -------------------------------------------------------------------------- */

    async getArticles({ commit }) {
      async function apiCall(api) {
        const { data, status } = await getArticlesApi(api)
        if (status === 200) commit('SET_ARTICLES_LIST', data)
      }
      return await this.$apiCaller(apiCall)()
    },

    async deleteArticle({ commit }, articleId) {
      async function apiCall(api) {
        console.log(await deleteArticleApi(api, articleId))
      }
      return await this.$apiCaller(apiCall)()
    },

    async editArticle({ state, commit }) {
      const article = state.article
      async function apiCall(api) {
        console.log(await editArticleApi(api, article))
      }
      return await this.$apiCaller(apiCall)()
    },

    async createArticle({ state, commit }) {
      const article = state.article
      async function apiCall(api) {
        console.log(await createArticleApi(api, article))
      }
      return await this.$apiCaller(apiCall)()
    },
  },
}
