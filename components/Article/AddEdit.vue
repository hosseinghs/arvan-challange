<template>
  <div>
    <b-row>
      <b-col cols="12" lg="9">
        <b-form @submit.prevent="submitForm()">
          <FormInput
            label="Title"
            err-msg="Required field"
            :v="article.title"
            :valid-state="isTitleValid"
            @change="
              lazyCaller(() => setArticleData({ k: 'title', v: $event }))
            "
          />
          <FormInput
            label="Description"
            type="text"
            :v="article.description"
            @change="
              lazyCaller(() => setArticleData({ k: 'description', v: $event }))
            "
          />
          <FormInput
            label="Body"
            type="text"
            :v="article.body"
            @change="lazyCaller(() => setArticleData({ k: 'body', v: $event }))"
          />
          <b-btn type="submit" variant="primary">Submit</b-btn>
        </b-form>
      </b-col>
      <b-col cols="12" lg="3">
        <div>
          <b-form-group role="group" label="Tags" class="text-start">
            <b-form-input
              v-model="newTag"
              class="form-control"
              placeholder="New Tag"
              type="text"
              @keypress.enter="addNewTag(newTag)"
            />
          </b-form-group>
        </div>
        <div class="tag-list">
          <b-form-checkbox-group
            :value="article.tagList"
            @change="setArticleData({ k: 'tagList', v: $event })"
          >
            <b-form-checkbox
              v-for="(tag, i) in tags"
              :key="i"
              :value="tag"
              :checked="
                slug
                  ? getArraysMutualObjects(tags, article.tagList)
                  : article.tagList
              "
              class="d-block"
            >
              {{ tag }}
            </b-form-checkbox>
          </b-form-checkbox-group>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { getArraysMutualObjects } from '~/utils/general'
import lazyCaller from '~/mixins/lazyCaller'
export default {
  name: 'AddOrEditArticlePage',
  mixins: [lazyCaller],
  data() {
    return {
      newTag: null,
    }
  },
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
    slug() {
      return this.$route.params.slug
    },
  },
  created() {
    if (this.slug) this.getSingleArticleBySlug(this.slug)
    this.getTags()
  },
  beforeDestroy() {
    this.clearArticle()
  },
  methods: {
    getArraysMutualObjects,
    ...mapActions('articleManagement', [
      'getTags',
      'editArticle',
      'clearArticle',
      'createArticle',
      'setArticleData',
      'addNewTagToTheList',
      'getSingleArticleBySlug',
    ]),
    async submitForm() {
      if (this.isTitleValid) {
        const res = this.slug
          ? await this.editArticle()
          : await this.createArticle()
        if (res) this.$router.push({ path: '/' })
      } else this.isTitleValid = false
    },
    addNewTag(newTag) {
      this.addNewTagToTheList(newTag)
      this.newTag = ''
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
