const baseURL = 'articles'

export function getArticlesApi(api, pageNumber = 0) {
  return api.get(`${baseURL}?offset=${pageNumber}&&limit=10`)
}

export function createArticleApi(api, article) {
  return api.post(baseURL, { article })
}

export function editArticleApi(api, article) {
  return api.put(baseURL + `/${article.slug}`, { article })
}

export function deleteArticleApi(api, id) {
  return api.delete(baseURL + `/${id}`)
}

export function getSingleArticleBySlug(api, slug) {
  return api.get(baseURL + `/${slug}`)
}