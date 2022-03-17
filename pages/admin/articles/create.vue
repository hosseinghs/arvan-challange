<template>
  <b-form @submit.prevent="submitForm()">
    <b-row>
      <b-col cols="12" lg="9">
        <FormInput
          label="Title"
          :v="article.title"
          @change="setArticleData({ k: 'title', v: $event })"
        />
        <FormInput
          label="Description"
          :v="article.description"
          @change="setArticleData({ k: 'description', v: $event })"
        />
        <FormInput
          label="Body"
          :v="article.body"
          @change="setArticleData({ k: 'body', v: $event })"
        />
        <b-btn type="submit" variant="primary">Submit</b-btn>
      </b-col>
      <b-col cols="12" lg="3">
        <FormInput label="Tags" />
      </b-col>
    </b-row>
  </b-form>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'AddOrEditArticlePage',
  computed: {
    ...mapState('articleManagement', ['article']),
  },
  methods: {
    ...mapActions('articleManagement', ['setArticleData', 'createArticle']),
    submitForm() {
      this.createArticle()
    },
  },
}
</script>
