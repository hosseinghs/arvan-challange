export default function ({ $axios, store, env, redirect }, inject) {
  store.registerModule('notification', {
    namespaced: true,
    state: () => ({
      isVisible: false,
      notif: {
        color: '',
        title: '',
      },
      timer: 5000,
    }),
    mutations: {
      SET_IS_VISIBLE(state, isVisible) {
        state.isVisible = isVisible
      },
      SET_NOTIF(state, notifConfig) {
        Object.assign(state.notif, notifConfig)
      },
      SET_TIMER(state, timer) {
        state.timer = timer
      },
    },
    actions: {
      notify({ commit }, { config, timer }) {
        if (timer === 0) return
        commit('SET_NOTIF', config)
        commit('SET_TIMER', timer)
        commit('SET_IS_VISIBLE', true)
        if (timer === -1) return
        setTimeout(() => {
          commit('SET_IS_VISIBLE', false)
        }, timer)
      },
      disable({ commit }) {
        commit('SET_IS_VISIBLE', false)
      },
      showSuccess({ dispatch }, { title, timer }) {
        title = title || 'عملیات با موفقیت انجام شد'
        timer = timer === undefined ? 5000 : timer
        dispatch('notify', {
          config: { color: 'success', title },
          timer,
        })
      },
      showError({ dispatch }, { title, timer }) {
        title = title || 'خطایی رخ داده است. مجدد تلاش کنید.'
        timer = timer === undefined ? 5000 : timer
        dispatch('notify', {
          config: { color: 'error', title },
          timer,
        })
      },
      showInfo({ dispatch }, { title, timer }) {
        title = title || 'متن پیام را وارد کنید'
        timer = timer === undefined ? 5000 : timer
        dispatch('notify', {
          config: { color: 'info', title },
          timer,
        })
      },
    },
  })
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

  const api = $axios.create({ baseURL: env.baseURL, withCredentials: false })

  api.setHeader('Content-Type', 'application/json', ['post'])

  api.onRequest((req) => {
    const userToken = window.localStorage.getItem('authorization')
    if (userToken) req.headers.authorization = `bearer ${JSON.parse(userToken)}`
  })
  api.onResponseError((err) => {
    if (err) {
      if (err && err.response.status === 401) {
        window.localStorage.removeItem('authorization')
        window.localStorage.removeItem('admin')
        redirect('/')
      }
      console.log(err.response)
      const msg =
        err.response.data.message ||
        err.response.data.error ||
        'مشکلی پیش آمده است'
      const payload = {
        config: {
          color: 'error',
          title: msg,
        },
        timer: 3000,
      }
      store.dispatch('notification/notify', payload)
      throw new Error(msg)
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
        result = await apiCallFunc(api)
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
