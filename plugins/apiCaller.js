export default function ({ $axios, store, env, redirect }, inject) {
  /* -------------------------------------------------------------------------- */
  /*                            create loading module                           */
  /* -------------------------------------------------------------------------- */

  store.registerModule('loading', {
    namespaced: true,
    state: () => ({
      isLoading: false,
    }),
    mutations: {
      SET_IS_LOADING(state, bool) {
        state.isLoading = bool
      },
    },
    actions: {
      setLoadingState({ commit }, bool) {
        commit('SET_IS_LOADING', bool)
      },
    },
  })

  /* -------------------------------------------------------------------------- */
  /*                           initiate axios instance                          */
  /* -------------------------------------------------------------------------- */

  const api = $axios.create({ baseURL: env.baseURL })

  api.setHeader('Content-Type', 'application/json', ['post'])

  /* -------------------------------------------------------------------------- */
  /*                             authorize api calls                            */
  /* -------------------------------------------------------------------------- */

  api.onRequest((req) => {
    const userToken = window.localStorage.getItem('authorization')
    if (userToken) req.headers.authorization = `Token ${userToken}`
  })

  /* -------------------------------------------------------------------------- */
  /*                               error handeling                              */
  /* -------------------------------------------------------------------------- */

  api.onResponseError((err) => {
    if (err) {
      if (err && err.response.status === 401) {
        window.localStorage.removeItem('authorization')
        window.localStorage.removeItem('admin')
        redirect('/')
      }
      console.log('error', err.response)
      const msg = 'We have a Problem'
      const payload = {
        config: {
          color: 'danger',
          title: msg,
        },
        timer: 3000,
      }
      store.dispatch('notification/notify', payload)
    }
    store.dispatch('loading/setLoadingState', false)
  })

  const apiCaller = function (apiCallFunc, hasLoading = true) {
    return async function () {
      let result
      let timeout
      let isLoadingActivated = false
      try {
        if (hasLoading) {
          timeout = setTimeout(() => {
            isLoadingActivated = true
            store.dispatch('loading/setLoadingState', true)
          }, 200)
        }
        result = (await apiCallFunc(api)) || true
      } catch (e) {
        result = false
      } finally {
        if (isLoadingActivated) store.dispatch('loading/setLoadingState', false)
        else clearTimeout(timeout)
      }
      return result
    }
  }

  inject('apiCaller', apiCaller)
}
