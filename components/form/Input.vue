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
      :placeholder="placeholder"
      :required="required"
      :state="validState"
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
      type: [String, Number, Boolean],
      default: null,
      required: false,
    },
    validState: {
      type: [Boolean, String],
      default: null,
    },
    type: {
      type: String,
      default: 'text',
      required: false,
    },
    placeholder: {
      type: String,
      default: '',
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
}
</script>
