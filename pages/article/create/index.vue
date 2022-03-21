<template>
  <div>
    <b-row>
      <b-col cols="12" lg="9">
        <b-form @submit.prevent="submitForm()">
          <div>
            <b-form-group
              role="group"
              label="Title"
              invalid-feedback="Requierd field"
              class="text-start"
            >
              <b-form-input
                v-model="titleValue"
                class="form-control"
                type="text"
              />
            </b-form-group>
          </div>
          <div>
            <b-form-group
              role="group"
              label="Description"
              invalid-feedback="Requierd field"
              class="text-start"
            >
              <b-form-input
                v-model="descriptionValue"
                class="form-control"
                type="text"
              />
            </b-form-group>
          </div>
          <div>
            <b-form-group
              role="group"
              label="Body"
              invalid-feedback="Requierd field"
              class="text-start"
            >
              <b-form-input
                v-model="bodyValue"
                class="form-control"
                type="text"
              />
            </b-form-group>
          </div>
          <b-btn type="submit" class="d-none d-lg-block" variant="primary">
            Submit
          </b-btn>
        </b-form>
      </b-col>
      <b-col cols="12" lg="3">
        <FormInput
          v-model="newTag"
          placeholder="New Tag"
          type="text"
          label="Tags"
          @keypress.enter="addNewTag(newTag)"
        />
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
        <b-btn
          type="submit"
          class="d-lg-none mt-3"
          variant="primary"
          @click.stop="submitForm()"
        >
          Submit
        </b-btn>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
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
    titleValue: {
      get() {
        return this.article.title
      },
      set(val) {
        return this.lazyCaller(() =>
          this.setArticleData({ k: 'title', v: val })
        )
      },
    },
    descriptionValue: {
      get() {
        return this.article.description
      },
      set(val) {
        return this.lazyCaller(() =>
          this.setArticleData({ k: 'description', v: val })
        )
      },
    },
    bodyValue: {
      get() {
        return this.article.body
      },
      set(val) {
        return this.lazyCaller(() => this.setArticleData({ k: 'body', v: val }))
      },
    },
  },
  created() {
    this.getTags()
  },
  beforeDestroy() {
    this.clearArticle()
  },
  methods: {
    ...mapActions('articleManagement', [
      'getTags',
      'clearArticle',
      'createArticle',
      'setArticleData',
      'addNewTagToTheList',
      'getSingleArticleBySlug',
    ]),
    async submitForm() {
      if (this.isTitleValid) {
        const res = await this.createArticle()
        if (res) this.$router.push({ path: '/article' })
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
