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
        :current-page="queries.offset"
        :per-page="queries.limit"
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

        <template #cell(description)="data">
          {{ data.item.description }}
        </template>

        <template #cell(createdAt)="data">
          {{ new Date(data.item.createdAt).toDateString() }}
        </template>

        <template #cell(actions)="data">
          <b-button-group class="mx-1">
            <b-button>...</b-button>
            <b-dropdown right>
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
          v-model="queries.offset"
          :total-rows="articles.articlesCount"
          :per-page="queries.limit"
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
          key: 'description',
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
  },
  created() {
    const page = this.$route.params.index || 1
    this.getData(page)
  },

  methods: {
    ...mapActions('warningGenerator', ['generateWarning', 'setWarningState']),
    ...mapActions('articleManagement', [
      'getArticles',
      'deleteArticle',
      'setArticleData',
      'setEditingArticle',
    ]),
    editPost(article) {
      if (!article) return null
      this.setEditingArticle(article)
      this.$router.push({
        name: 'admin-create',
        params: { isEdit: true },
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
    getData(pageNumber) {
      if (pageNumber === 1) this.$router.push({ path: '/admin/articles' })
      else if (pageNumber && pageNumber !== 1)
        this.$router.push({
          name: 'admin-articles-page',
          params: { index: pageNumber },
        })
      this.getArticles()
    },
    async fireDeleteArticleAction(article) {
      const res = await this.deleteArticle(article.slug)
      if (res) this.setWarningState(false)
    },
  },
}
</script>
