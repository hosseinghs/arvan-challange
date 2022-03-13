const baseURL = 'users'

export function registerUserApi(api, user) {
  return api.$post(baseURL, user)
}
