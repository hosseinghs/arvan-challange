<template>
  <div>
    <LayoutHeader />
    <LayoutLoading />
    <LayoutAlert />
    <b-row>
      <b-col cols="1" lg="2">
        <LayoutSidebar />
      </b-col>
      <b-col cols="11" lg="10" class="px-0">
        <Nuxt />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import storeModule from '~/store/admin/-article'
export default {
  name: 'DefaultLayout',
  middleware({ store, redirect }) {
    const userToken = localStorage.getItem('authorization')
    if (!userToken) redirect('/login')
    store.dispatch('register/setIsLoggedInState', !!userToken)
  },
  beforeCreate() {
    if (!this.$store.hasModule('articleManagement'))
      this.$store.registerModule('articleManagement', storeModule)
  },
  beforeDestroy() {
    this.$store.unregisterModule('articleManagement')
  },
}
</script>