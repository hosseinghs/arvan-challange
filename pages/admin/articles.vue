<template>
  <nuxt-child />
</template>

<script>
import storeModule from '~/store/admin/-article'

export default {
  name: 'ArticlesEntry',
  beforeCreate() {
    if (!this.$store.hasModule('articleManagement'))
      this.$store.registerModule('articleManagement', storeModule)
  },
  beforeDestroy() {
    this.$store.unregisterModule('articleManagement')
  },
}
</script>