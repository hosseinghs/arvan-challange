<template>
  <b-col cols="12" md="5" xl="2" class="ml-auto mr-3">
    <b-alert fade dismissible :variant="notif.color" :show="isVisible">
      {{ notif.title }}
    </b-alert>
  </b-col>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'AlertCompoent',
  computed: {
    ...mapState('notification', ['isVisible', 'notif', 'timer']),
  },
  methods: {
    ...mapActions('notification', ['']),
  },
}
</script>

<style></style>
