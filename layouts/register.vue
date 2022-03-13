<template>
  <div class="_register_layout">
    <b-col cols="11" md="6" lg="3">
      <Register />
    </b-col>
  </div>
</template>

<script>
export default {
  name: 'RegisterLayout',
}
</script>

<style scoped>
._register_layout {
  width: 100%;
  height: 100vh;
  display: grid;
  place-items: center;
  background-color: #fff;
}
</style>
