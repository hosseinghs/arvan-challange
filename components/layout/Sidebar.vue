<template>
  <div>
    <b-sidebar visible no-header>
      <div class="p-3">
        <h4 id="sidebar-no-header-title">Post</h4>
      </div>
      <div>
        <ul class="m-0 p-0">
          <NuxtLink to="/admin/articles">
            <li>
              <span>All Articles</span>
            </li>
          </NuxtLink>
          <NuxtLink to="/admin/article/create">
            <li>
              <span>New Article</span>
            </li>
          </NuxtLink>
        </ul>
      </div>
    </b-sidebar>
  </div>
</template>

<script>
export default {
  name: 'SidebarComponent',
}
</script>

<style scoped>
::v-deep .b-sidebar {
  top: 56px !important;
  background-color: #1c7cd5 !important;
  color: #fff !important;
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
