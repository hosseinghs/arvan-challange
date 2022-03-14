<template>
  <div>
    <LayoutHeader />
    <LayoutLoading />
    <LayoutAlert />

    <div class="_default_layout">
      <Nuxt />
    </div>
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout',
}
</script>

<style scoped>
._default_layout {
  width: 100%;
  height: 100vh;
}
</style>
