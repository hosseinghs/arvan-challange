const baseURL = 'users'

export function registerUserApi(api, user) {
  return api.$post(baseURL, { user })
}

export function loginApi(api, user) {
  return api.post(baseURL + '/login', { user })
}
