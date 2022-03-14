<template>
  <div>
    <LayoutLoading />
    <LayoutAlert />

    <div class="_register_layout">
      <Nuxt />
    </div>
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
