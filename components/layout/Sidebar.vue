<template>
  <div class="custom-sidebar">
    <div class="p-3">
      <h4 id="sidebar-no-header-title">Post</h4>
    </div>
    <div>
      <ul class="m-0 p-0">
        <a
          v-for="{ id, route, name } in navigationItems"
          :key="id"
          :class="isActive(route)"
          @click.stop="$router.push({ path: `/${route}` })"
        >
          <li>
            <span>{{ name }}</span>
          </li>
        </a>
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
  methods: {
    isActive(route) {
      return this.$route.path === `/${route}` ? 'on-hover' : ''
    },
  },
}
</script>

<style scoped>
.custom-sidebar {
  position: absolute;
  width: 100%;
  height: calc(100vh - 56px);
  top: 56px;
  left: 0;
  color: #fff !important;
  background-color: #1c7cd5 !important;
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
  cursor: pointer;
}

ul > a > li {
  margin: 0.5em 2em !important;
}

.on-hover {
  background-color: rgba(255, 255, 255, 0.15);
}

ul > a:hover {
  background-color: rgba(255, 255, 255, 0.15);
}
</style>
