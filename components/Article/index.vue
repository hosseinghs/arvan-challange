<template>
  <b-form @submit.prevent="log">
    <b-row>
      <b-col cols="12" lg="9">
        <FormInput label="Title" />
        <FormInput label="Description" />
        <FormInput label="Body" />
        <b-btn class="primary">Submit</b-btn>
      </b-col>
      <b-col cols="12" lg="3">
        <FormInput label="Tags" />
      </b-col>
    </b-row>
  </b-form>
</template>

<script>
export default {
  name: 'AddOrEditArticleComponent',
  methods: {
    log() {
      console.log('hi')
    },
  },
}
</script>

<style></style>
