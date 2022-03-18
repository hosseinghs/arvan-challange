import {
  getArticlesApi,
  deleteArticleApi,
  editArticleApi,
  createArticleApi,
} from '~/services/articles'

import { getTagsApi } from '~/services/tags'
import { Article } from '~/models/article'
import { addToArr } from '~/utils/general'

export default {
  namespaced: true,

  state: () => ({
    articles: {},
    article: new Article(),
    tags: [],
  }),

  mutations: {
    SET_ARTICLES_LIST(state, payload) {
      state.articles = Object.assign({}, payload)
    },
    SET_ARTICLE_DATA(state, { k, v }) {
      state.article[k] = v
    },
    SET_EDITING_ARTICLE(state, editingArticle) {
      state.article = editingArticle
    },
    DELETE_ARTICLE_FROM_THE_LIST(state, slug) {
      const arr = state.articles.articles
      const doomedObj = arr.find((obj) => obj.slug === slug)
      const doomedObjIndex = arr.indexOf(doomedObj)
      arr.splice(doomedObjIndex, 1)
    },
    SET_TAGS(state, tags) {
      const list = state.tags
      list.splice(0)
      addToArr(list, tags)
    },
  },

  actions: {
    setArticleData({ commit }, { k, v }) {
      commit('SET_ARTICLE_DATA', { k, v })
    },

    setEditingArticle({ commit }, editingArticle) {
      commit('SET_EDITING_ARTICLE', editingArticle)
    },
    /* -------------------------------------------------------------------------- */
    /*                                  api calls                                 */
    /* -------------------------------------------------------------------------- */

    async getArticles({ commit }, query) {
      async function apiCall(api) {
        const { data, status } = await getArticlesApi(api, query)
        if (status === 200) commit('SET_ARTICLES_LIST', data)
      }
      return await this.$apiCaller(apiCall)()
    },

    async deleteArticle({ commit }, slug) {
      async function apiCall(api) {
        const { status } = await deleteArticleApi(api, slug)
        if (status === 204) commit('DELETE_ARTICLE_FROM_THE_LIST', slug)
        return true
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

    async getTags({ commit }) {
      async function apiCall(api) {
        const { status, data } = await getTagsApi(api)
        if (status === 200) commit('SET_TAGS', data.tags)
        return true
      }
      return await this.$apiCaller(apiCall)()
    },
  },
}
