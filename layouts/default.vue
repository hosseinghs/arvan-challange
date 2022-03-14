<template>
  <div>
    <LayoutHeader />
    <LayoutLoading />
    <LayoutAlert />

    <div class="_default_layout">
      <Nuxt />
    </div>
  </div>
</template>

<script>
import storeModule from '~/store/admin/-article'
export default {
  name: 'DefaultLayout',
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
