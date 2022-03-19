<template>
  <b-col cols="12" md="5" xl="2" class="custom-alert ml-auto mr-3">
    <b-alert fade dismissible :variant="notif.color" :show="isVisible">
      {{ notif.title }}
    </b-alert>
  </b-col>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'AlertCompoent',
  computed: {
    ...mapState('notification', ['isVisible', 'notif', 'timer']),
  },
}
</script>

<style scoped>
.custom-alert {
  position: fixed;
  top: 15%;
  right: 5%;
  z-index: 50 !important;
}
</style>