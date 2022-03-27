<template>
  <div>
    <LayoutHeader />
    <LayoutAlert />
    <b-row>
      <b-col cols="2" class="position-relative">
        <LayoutSidebar />
      </b-col>
      <b-col cols="10" class="content px-4">
        <LayoutLoading />
        <Nuxt />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import articleModule from '~/store/admin/-article'
import warningGeneratorModule from '~/store/-warningGenerator'
export default {
  name: 'DefaultLayout',
  middleware({ store, redirect }) {
    const userToken = localStorage.getItem('authorization')
    if (!userToken) redirect('/login')
    store.dispatch('register/setIsLoggedInState', !!userToken)
  },
  beforeCreate() {
    if (!this.$store.hasModule('articleManagement'))
      this.$store.registerModule('articleManagement', articleModule)
    if (!this.$store.hasModule('warningGenerator'))
      this.$store.registerModule('warningGenerator', warningGeneratorModule)
  },
  beforeDestroy() {
    this.$store.unregisterModule('articleManagement')
    this.$store.unregisterModule('warningGenerator')
  },
}
</script>

<style scoped>
.content {
  background-color: #fff !important;
  margin-top: 5em;
  overflow-y: scroll;
  height: calc(100vh - 85px);
}
</style>
