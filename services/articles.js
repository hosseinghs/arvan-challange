const baseURL = 'articles'

export function getArticlesApi(api) {
  return api.get(baseURL)
}

export function createArticleApi(api, article) {
  return api.$post(baseURL, article)
}

export function editArticleApi(api, article) {
  return api.$put(baseURL, article)
}

export function deleteArticleApi(api, article) {
  return api.$delete(baseURL, article)
}
