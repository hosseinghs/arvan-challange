<template>
  <div>
    <ArticleAddEdit />
  </div>
</template>

<script>
export default {
  name: 'EditArticlePage',
  created() {
    console.log('edit', this.$route)
  },
}
</script>
