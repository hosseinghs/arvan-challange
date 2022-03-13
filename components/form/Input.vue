<template>
  <div role="group" class="text-start">
    <label for="input-live">{{ label }}</label>
    <b-form-input
      :type="type"
      aria-describedby="input-live-help input-live-feedback"
      v-on="$listeners"
    />

    <!-- This will only be shown if the preceding input has an invalid state -->
    <b-form-invalid-feedback id="input-live-feedback">
      {{ errMsg }}
    </b-form-invalid-feedback>
  </div>
</template>

<script>
export default {
  name: 'InputComponent',
  props: {
    label: {
      type: String,
      default: 'label',
      required: false,
    },
    type: {
      type: String,
      default: '',
      required: true,
    },
    errMsg: {
      type: String,
      default: 'error message',
      required: false,
    },
  },
  computed: {},
}
</script>