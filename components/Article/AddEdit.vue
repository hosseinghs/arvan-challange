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
        <ArticleTags />

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

  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      isTitleValid: null,
      isdDescriptionValid: null,
      isBodyValid: null,
    }
  },

  computed: {
    ...mapState('articleManagement', ['article']),

    titleValue: {
      get() {
        return this.article.title
      },
      set(val) {
        this.setArticleData({ k: 'title', v: val })
      },
    },
    descriptionValue: {
      get() {
        return this.article.description
      },
      set(val) {
        this.setArticleData({ k: 'description', v: val })
      },
    },
    bodyValue: {
      get() {
        return this.article.body
      },
      set(val) {
        return this.setArticleData({ k: 'body', v: val })
      },
    },

    slug() {
      return this.isEdit && this.$route.params.slug
    },
  },

  watch: {
    titleValue(val) {
      if (val.length) this.isTitleValid = true
      else this.isTitleValid = false
      console.log(this.isTitleValid)
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
    this.isEdit && this.getSingleArticleBySlug(this.slug)
  },

  beforeDestroy() {
    this.clearArticle()
  },

  methods: {
    getArraysMutualObjects,
    ...mapActions('articleManagement', [
      'editArticle',
      'clearArticle',
      'createArticle',
      'setArticleData',
      'getSingleArticleBySlug',
    ]),

    async submitForm() {
      if (this.isTitleValid && this.isdDescriptionValid && this.isBodyValid) {
        const res = this.isEdit
          ? await this.editArticle()
          : await this.createArticle()
        if (res) this.$router.push({ path: '/article' })
      } else {
        this.isBodyValid = false
        this.isTitleValid = false
        this.isdDescriptionValid = false
      }
    },
  },
}
</script>
