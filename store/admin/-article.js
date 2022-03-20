import {
  editArticleApi,
  getArticlesApi,
  createArticleApi,
  deleteArticleApi,
  getSingleArticleBySlug,
} from '~/services/articles'

import { getTagsApi } from '~/services/tags'
import { Article } from '~/models/article'
import { addToArr, deleteObjFromArr } from '~/utils/general'

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
      deleteObjFromArr(arr, 'slug', slug)
    },
    SET_TAGS(state, tags) {
      const list = state.tags
      list.splice(0)
      addToArr(list, tags.sort())
    },
    ADD_NEW_TAG_TO_THE_LIST(state, newTag) {
      state.tags.push(newTag)
      state.article.tagList.push(newTag)
    },
    CLEAR_ARTICLE(state) {
      state.article = new Article()
    },
    SET_ARTICLE(state, article) {
      state.article = Object.assign({}, article)
    },
  },

  actions: {
    setArticleData({ commit }, { k, v }) {
      commit('SET_ARTICLE_DATA', { k, v })
    },

    setEditingArticle({ commit }, editingArticle) {
      commit('SET_EDITING_ARTICLE', editingArticle)
    },

    addNewTagToTheList({ commit }, newTag) {
      commit('ADD_NEW_TAG_TO_THE_LIST', newTag)
    },

    clearArticle({ commit }) {
      commit('CLEAR_ARTICLE')
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

    async deleteArticle({ commit, dispatch }, slug) {
      async function apiCall(api) {
        const { status } = await deleteArticleApi(api, slug)
        if (status === 204) commit('DELETE_ARTICLE_FROM_THE_LIST', slug)
        dispatch('notification/notify', {
          color: 'success',
          title: 'Article deleted successfuly',
        })
        return true
      }
      return await this.$apiCaller(apiCall)()
    },

    async editArticle({ state }) {
      const article = state.article
      async function apiCall(api) {
        await editArticleApi(api, article)
      }
      return await this.$apiCaller(apiCall)()
    },

    async createArticle({ state }) {
      const article = state.article
      async function apiCall(api) {
        await createArticleApi(api, article)
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

    async getSingleArticleBySlug({ commit }, slug) {
      async function apiCall(api) {
        const { data } = await getSingleArticleBySlug(api, slug)
        commit('SET_ARTICLE', data.article)
        return true
      }
      return await this.$apiCaller(apiCall)()
    },
  },
}
