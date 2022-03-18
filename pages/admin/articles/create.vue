<template>
  <b-form @submit.prevent="submitForm()">
    <b-row>
      <b-col cols="12" lg="9">
        <FormInput
          label="Title"
          type="text"
          :v="article.title"
          @change="setArticleData({ k: 'title', v: $event })"
        />
        <FormInput
          label="Description"
          type="text"
          :v="article.description"
          @change="setArticleData({ k: 'description', v: $event })"
        />
        <FormInput
          label="Body"
          type="text"
          :v="article.body"
          @change="setArticleData({ k: 'body', v: $event })"
        />
        <b-btn type="submit" variant="primary">Submit</b-btn>
      </b-col>
      <b-col cols="12" lg="3">
        <FormInput type="text" label="Tags" />
        <div class="tag-list">
          <b-form-checkbox-group v-model="tags" label="Using options array:">
            <b-form-checkbox value="accepted">
              I accept the terms and use
            </b-form-checkbox>
          </b-form-checkbox-group>
        </div>
      </b-col>
    </b-row>
  </b-form>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'AddOrEditArticlePage',
  data() {
    return {
      tags: [],
    }
  },
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

<style scoped>
.tag-list {
  padding: 0.5em;
  border-radius: 4px;
  border: solid 1px #ddd;
}
</style>
