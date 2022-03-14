<template>
  <div>
    <b-alert fade dismissible :variant="notif.color" :show="isVisible">{{
      notif.title
    }}</b-alert>
  </div>
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
