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
          <b-form-group>
            <b-button type="submit" class="d-none d-lg-block" variant="primary">
              Submit
            </b-button>
          </b-form-group>
        </b-form>
      </b-col>
      <b-col cols="12" lg="3">
        <ArticleTags />
        <b-form-group>
          <b-button
            class="d-lg-none mt-3"
            variant="primary"
            @click.stop="submitForm()"
          >
            Submit
          </b-button>
        </b-form-group>
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

  beforeDestroy() {
    this.clearArticle()
  },

  methods: {
    getArraysMutualObjects,
    ...mapActions('articleManagement', [
      'clearArticle',
      'createArticle',
      'setArticleData',
      'getSingleArticleBySlug',
    ]),
    
    async submitForm() {
      if (this.isTitleValid && this.isdDescriptionValid && this.isBodyValid) {
        const res = await this.createArticle()
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
