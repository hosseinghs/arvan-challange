<template>
  <div class="my-header">
    <b-navbar toggleable="lg" type="dark">
      <b-navbar-brand href="#">Arvan Challange</b-navbar-brand>
      <span style="color: #fff"> Welcome hossein </span>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <button class="btn">Logout</button>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'HeaderComponent',
}
</script>

<style scoped>
.my-header {
  background-color: #373a3c;
}

button {
  color: #5bc0de;
  border: 1px solid;
}
</style>
