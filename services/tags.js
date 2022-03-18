const baseURL = 'tags'

export function getTagsApi(api) {
  return api.get(baseURL)
}