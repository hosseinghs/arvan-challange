<template>
  <b-container>
    <h1 class="mb-4">All Posts</h1>
    <b-table striped hover :fields="fields" :items="articles.articles">
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
            <b-dropdown-item @click.stop="editPost(data.item)"
              >Edit</b-dropdown-item
            >
            <b-dropdown-item>Delete</b-dropdown-item>
          </b-dropdown>
        </b-button-group>
      </template>
    </b-table>
  </b-container>
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
    }
  },
  computed: {
    ...mapState('articleManagement', ['articles']),
  },
  created() {
    this.getArticles()
  },

  methods: {
    ...mapActions('articleManagement', ['getArticles']),
    editPost(item) {
      if (!item) return null
      console.log(item)
    },
    generateWarningConfig(item) {
      if (!item) return null
      console.log(item)
    },
  },
}
</script>

<style></style>
