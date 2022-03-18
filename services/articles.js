const baseURL = 'articles'

export function getArticlesApi(api, pageNumber = 0) {
  return api.get(`${baseURL}?offset=${pageNumber}`)
}

export function createArticleApi(api, article) {
  return api.post(baseURL, { article })
}

export function editArticleApi(api, { id, article }) {
  return api.put(baseURL + `/${id}`, { article })
}

export function deleteArticleApi(api, id) {
  return api.delete(baseURL + `/${id}`)
}
