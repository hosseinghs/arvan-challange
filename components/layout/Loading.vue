<template>
  <div v-if="isModalLoading" id="_loading_component">
    <div id="_loading_spinner"></div>
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
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 100 !important;
  display: grid;
  place-items: center;
  background-color: rgba(1, 1, 1, 0.5);
}
#_loading_spinner {
  pointer-events: none;
  width: 4em;
  height: 4em;
  border: 0.4em solid transparent;
  border-color: #eee;
  border-top-color: #3e67ec;
  border-radius: 50%;
  animation: loadingspin 1s linear infinite;
}

@keyframes loadingspin {
  100% {
    transform: rotate(360deg);
  }
}
</style>