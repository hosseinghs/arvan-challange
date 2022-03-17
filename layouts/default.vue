<template>
  <div>
    <LayoutHeader />
    <LayoutLoading />
    <LayoutAlert />
    <LayoutSidebar />
    <div class="_default_layout">
      <Nuxt />
    </div>
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

<style scoped>
._default_layout {
  width: 100%;
  height: 100vh;
}
</style>
