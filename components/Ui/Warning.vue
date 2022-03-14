<template>
  <b-modal v-model="isWarningVisible" centered :title="warningConfig.title">
    <div class="mb-3">
      {{ warningConfig.text }}
    </div>
    <template #modal-footer>
      <div class="w-100" style="text-align: end">
        <b-button variant="outline" class="px-3 border"> No </b-button>
        <b-button variant="danger" class="px-4"> Yes </b-button>
      </div>
    </template>
  </b-modal>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'WarningComponent',
  computed: {
    ...mapState('warningGenerator', ['warningState', 'warningConfig']),
    isWarningVisible: {
      get() {
        return this.warningState
      },
      set(val) {
        return this.setWarningState(val)
      },
    },
  },
  methods: {
    ...mapActions('warningGenerator', ['setWarningState']),
  },
}
</script>

<style></style>
