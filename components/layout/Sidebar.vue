<template>
  <div class="custom-sidebar">
    <div class="p-3">
      <h4 id="sidebar-no-header-title">Post</h4>
    </div>
    <div>
      <ul class="m-0 p-0">
        <NuxtLink
          v-for="{ id, route, name } in navigationItems"
          :key="id"
          :to="`/${route}`"
        >
          <li>
            <span>{{ name }}</span>
          </li>
        </NuxtLink>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'SidebarComponent',
  computed: {
    ...mapState(['navigationItems']),
  },
}
</script>

<style scoped>
.custom-sidebar {
  top: 56px !important;
  background-color: #1c7cd5 !important;
  color: #fff !important;
  height: 100vh;
}

ul {
  list-style-type: none;
}

ul > a {
  display: block;
  background-color: transparent;
  transition: 0.2s ease-in-out;
  padding: 0.25em;
  color: #fff !important;
  text-decoration: none !important;
}

ul > a > li {
  margin: 0.5em 2em !important;
}

ul > a:hover {
  background-color: rgba(255, 255, 255, 0.15);
}

.links {
  cursor: pointer;
}
</style>
