const baseURL = 'user'

export function registerUserApi(api, user) {
  return api.$post(baseURL, user)
}
