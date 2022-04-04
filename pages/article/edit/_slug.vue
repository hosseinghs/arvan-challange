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
                :state="isTitleValid"
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
                :state="isdDescriptionValid"
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
                :state="isBodyValid"
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
        <b-button
          class="d-lg-none mt-3"
          variant="primary"
          @click.stop="submitForm()"
        >
          Submit
        </b-button>
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
      isTitleValid: null,
      isdDescriptionValid: null,
      isBodyValid: null,
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

    slug() {
      return this.$route.params.slug
    },
  },

  watch: {
    titleValue(val) {
      if (val.length) this.isTitleValid = true
      else this.isTitleValid = false
    },
    descriptionValue(val) {
      if (val.length) this.isdDescriptionValid = true
      else this.isdDescriptionValid = false
    },
    bodyValue(val) {
      if (val.length) this.isBodyValid = true
      else this.isBodyValid = false
    },
  },

  created() {
    this.fireApies(this.slug)
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
      'setArticleData',
      'addNewTagToTheList',
      'getSingleArticleBySlug',
    ]),

    fireApies(slug) {
      const promises = [this.getSingleArticleBySlug(slug), this.getTags()]
      Promise.all(promises)
    },

    async submitForm() {
      if (this.titleValue && this.descriptionValue && this.bodyValue) {
        const res = await this.editArticle()
        if (res) this.$router.push({ path: '/' })
      }
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
