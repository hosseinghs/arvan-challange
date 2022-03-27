<template>
  <div class="my-header">
    <b-navbar toggleable="lg" type="dark">
      <b-navbar-brand>Arvan Challange</b-navbar-brand>
      <span style="color: #fff">
        <div class="d-none d-lg-block">
          {{ userName }}
        </div>
        <b-button
          class="d-lg-none"
          variant="outline-info"
          @click.stop="logout()"
        >
          Logout
        </b-button>
      </span>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-button variant="outline-info" @click.stop="logout()">
            Logout
          </b-button>
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
