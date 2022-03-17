const baseURL = 'articles'

export function getArticlesApi(api) {
  return api.get(baseURL)
}

export function createArticleApi(api, article) {
  return api.$post(baseURL, { article })
}

export function editArticleApi(api, { id, article }) {
  return api.$put(baseURL + `/${id}`, {article})
}

export function deleteArticleApi(api, id) {
  return api.$delete(baseURL + `${id}`)
}
