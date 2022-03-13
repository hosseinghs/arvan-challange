export default {
  head: {
    ssr: false,
    title: 'arvan-challange',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // css: ['~/assets/css/main.scss'],

  plugins: ['~/plugins/apiCaller.js'],

  components: true,

  buildModules: ['@nuxtjs/eslint-module'],

  modules: ['bootstrap-vue/nuxt', '@nuxtjs/axios'],
  build: {},
}
