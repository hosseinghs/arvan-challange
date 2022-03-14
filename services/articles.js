const baseURL = 'articles'

export function getArticlesApi(api) {
  return api.get(baseURL)
}
