<template>
  <b-modal v-model="modalVisibility">
    <p class="my-4">Hello from modal!</p>
  </b-modal>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'ModalComponent',
  computed: {
    ...mapState(['isModalVisible']),
    modalVisibility: {
      get() {
        return this.isModalVisible
      },
      set(val) {
        return this.setLoadingState(val)
      },
    },
  },
  methods: {
    ...mapActions(['setLoadingState']),
  },
}
</script>

<style></style>
