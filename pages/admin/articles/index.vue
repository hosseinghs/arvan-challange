<template>
  <div class="px-4">
    <h1 class="mb-4">All Posts</h1>
    <div>
      <b-table hover striped :fields="fields" :items="articles.articles">
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
      <!-- <b-pagination
        v-model="queries.currentPage"
        :total-rows="articles.articlesCount"
        :per-page="queries.perPage"
      /> -->
    </div>
    <UiWarning @submitBtnClicked="fireDeleteArticleAction(selectedArticle)" />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'ArticlePage',
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
      queries: {
        perPage: 10,
        currentPage: 1,
      },
      selectedArticle: false,
    }
  },
  computed: {
    ...mapState('articleManagement', ['articles']),
  },
  created() {
    this.getArticles()
  },

  methods: {
    ...mapActions('warningGenerator', ['generateWarning', 'setWarningState']),
    ...mapActions('articleManagement', [
      'getArticles',
      'deleteArticle',
      'setQueries',
    ]),
    editPost(item) {
      if (!item) return null
      console.log(item)
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
    async fireDeleteArticleAction(article) {
      const res = await this.deleteArticle(article.slug)
      if (res) this.setWarningState(false)
    },
  },
}
</script>

<style></style>
