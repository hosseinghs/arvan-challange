<template>
  <div v-if="isModalLoading" id="_loading_component">
    <b-spinner style="width: 4em; height: 4rem" variant="primary"></b-spinner>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'LoadingComponent',
  computed: {
    ...mapState('loading', ['isLoading']),
    isModalLoading: {
      get() {
        return this.isLoading
      },
      set(val) {
        return this.setLoadingState(val)
      },
    },
  },
  methods: {
    ...mapActions('loading', ['setLoadingState']),
  },
}
</script>

<style>
#_loading_component {
  width: 100%;
  height: 100vh;
  z-index: 100 !important;
  display: grid;
  place-items: center;
}
</style>
