<template>
  <b-container>
    <h1>All Posts</h1>
    <b-table striped hover :items="articles.articles"></b-table>
  </b-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'ArticlePage',

  computed: {
    ...mapState('articleManagement', ['articles']),
  },
  created() {
    this.getArticles()
  },

  methods: {
    ...mapActions('articleManagement', ['getArticles']),
  },
}
</script>

<style></style>
