<template>
  <b-form-group
    role="group"
    :label="label"
    :invalid-feedback="errMsg"
    class="text-start"
  >
    <b-form-input
      class="form-control"
      :type="type"
      :required="required"
      :value="v"
      v-on="$listeners"
    />
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
    v: {
      type: [String, Number],
      default: null,
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
    required: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    inputVModel() {
      return this.vModel
    },
  },
}
</script>
