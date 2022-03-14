<template>
  <b-form-group role="group" :label="label" class="text-start">
    <b-form-input
      :type="type"
      aria-describedby="input-live-help input-live-feedback"
      v-on="$listeners"
    />

    <!-- This will only be shown if the preceding input has an invalid state -->
    <b-form-invalid-feedback id="input-live-feedback">
      {{ errMsg }}
    </b-form-invalid-feedback>
  </b-form-group>
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
