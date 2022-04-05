<template>
  <div>
    <h1 class="mb-4">All Posts</h1>
    <div>
      <b-table
        hover
        responsive
        striped
        :fields="fields"
        :items="articles.articles"
        :per-page="10"
      >
        /*
        --------------------------------------------------------------------------
        */ /* customize table celss */ /*
        --------------------------------------------------------------------------
        */
        <template #cell(author)="data">
          {{ data.item.author.username }}
        </template>

        <template #cell(tags)="data">
          <div v-for="(tag, i) in data.item.tagList" :key="i">
            <span>{{ tag }} ,</span>
          </div>
        </template>

        <template #cell(body)="data">
          {{ divideWordsFromSentence(data.item.body, 20) }}
        </template>

        <template #cell(createdAt)="data">
          {{ new Date(data.item.createdAt).toDateString() }}
        </template>

        <template #cell(actions)="data">
          <b-button-group class="mx-1">
            <b-button class="bg-sky-blue">...</b-button>
            <b-dropdown class="table-dropdown" right>
              <b-dropdown-item @click.stop="editPost(data.item)">
                Edit
              </b-dropdown-item>
              <b-dropdown-item @click.stop="generateWarningConfig(data.item)">
                Delete
              </b-dropdown-item>
            </b-dropdown>
          </b-button-group>
        </template>
      </b-table>

      <div class="mt-3">
        <b-pagination
          v-model="page"
          :total-rows="articles.articlesCount"
          :per-page="10"
          align="center"
          @change="getData($event)"
        />
      </div>
    </div>
    <UiWarning @submitBtnClicked="fireDeleteArticleAction(selectedArticle)" />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { Queries } from '~/models/queries'
import { divideWordsFromSentence } from '~/utils/general'
export default {
  name: 'ArticleTableComponent',
  data() {
    return {
      fields: [
        {
          key: 'title',
        },
        {
          value: 'author',
          key: 'author',
        },
        {
          value: 'tagList',
          key: 'tags',
        },
        {
          key: 'body',
        },
        {
          key: 'createdAt',
        },
        {
          value: ' ',
          key: 'actions',
        },
      ],
      selectedArticle: false,
      queries: new Queries(),
    }
  },
  computed: {
    ...mapState('articleManagement', ['articles']),
    page: {
      get() {
        const _page = this.$route.params.page
        if (_page) return +_page
        return 1
      },
      set(val) {
        return val
      },
    },
  },
  watch: {
    page(val) {
      if (val === 1) this.getData(+val)
    },
  },
  created() {
    const page = this.page
    this.getData(page)
  },
  methods: {
    divideWordsFromSentence,
    ...mapActions('warningGenerator', ['generateWarning', 'setWarningState']),
    ...mapActions('articleManagement', [
      'getArticles',
      'deleteArticle',
      'setArticleData',
    ]),
    
    editPost(article) {
      if (!article) return null
      this.$router.push({
        name: 'article-edit-slug',
        params: { slug: article.slug },
      })
    },

    generateWarningConfig(item) {
      if (!item) return null
      this.selectedArticle = item
      const warningConfig = {
        title: 'Delete Article',
        text: 'Are you sure to delete Article?',
      }
      this.generateWarning(warningConfig)
    },

    getData(currentPage) {
      let page = null

      if (typeof currentPage === 'number') page = currentPage
      else {
        const currentRoute = this.$route
        if (currentRoute.params.page) page = +this.$route.params.page
        else page = 1
        this.currentPage = page
      }

      const offset = (page - 1) * 10

      if (currentPage === 1) this.$router.push({ path: '/article' })
      else if (currentPage && currentPage !== 1)
        this.$router.push({
          name: `article-page-page`,
          params: { page },
        })

      this.getArticles(offset)
    },

    async fireDeleteArticleAction(article) {
      const res = await this.deleteArticle(article.slug)
      if (res) this.setWarningState(false)
    },
  },
}
</script>

<style scoped>
.table-dropdown {
  background-color: #56cde0;
}
::v-deep button.dropdown-toggle {
  background-color: #56cde0;
}
</style>
