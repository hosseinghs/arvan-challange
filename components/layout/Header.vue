<template>
  <div class="my-header">
    <b-navbar toggleable="lg" type="dark">
      <b-navbar-brand>Arvan Challange</b-navbar-brand>
      <span style="color: #fff">
        <div class="d-none d-lg-block">
          {{ userName }}
        </div>
        <button class="btn d-lg-none" @click.stop="logout()">Logout</button>
      </span>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <button class="btn" @click.stop="logout()">Logout</button>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'HeaderComponent',
  computed: {
    userName() {
      const username = localStorage.getItem('admin')
      return username || 'Admin'
    },
  },
  methods: {
    logout() {
      localStorage.removeItem('authorization')
      localStorage.removeItem('admin')
      this.$router.push({ path: '/login' })
    },
  },
}
</script>

<style scoped>
.my-header {
  width: 100%;
  position: fixed;
  top: 0;
  background-color: #373a3c;
}

button {
  color: #5bc0de;
  border: 1px solid;
}
</style>
