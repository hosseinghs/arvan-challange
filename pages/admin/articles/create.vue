<template>
  <b-form @submit.prevent="submitForm()">
    <b-row>
      <b-col cols="12" lg="9">
        <FormInput
          label="Title"
          type="text"
          err-msg="Required field"
          :v="article.title"
          :valid-state="isTitleValid"
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
        <FormInput placeholder="New Tag" type="text" label="Tags" />
        <div class="tag-list">
          <b-form-checkbox-group
            :value="article.tagList"
            @change="setArticleData({ k: 'tagList', v: $event })"
          >
            <b-form-checkbox
              v-for="(tag, i) in tags"
              :key="i"
              :value="tag"
              class="d-block"
            >
              {{ tag }}
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
  computed: {
    ...mapState('articleManagement', ['article', 'tags']),
    isTitleValid: {
      get() {
        return this.article.title
      },
      set(val) {
        return this.setArticleData({ k: 'title', v: val })
      },
    },
  },
  created() {
    this.getTags()
  },
  methods: {
    ...mapActions('articleManagement', [
      'getTags',
      'createArticle',
      'setArticleData',
      'editArticle',
    ]),
    submitForm() {
      const isEdit = this.$route.params.isEdit
      if (this.isTitleValid) isEdit ? this.editArticle() : this.createArticle()
      else this.isTitleValid = false
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
