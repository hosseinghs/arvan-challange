<template>
  <div>
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
          class="d-block"
          :checked="getArraysMutualObjects(tags, article.tagList)"
        >
          {{ tag }}
        </b-form-checkbox>
      </b-form-checkbox-group>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { getArraysMutualObjects } from '~/utils/general'

export default {
  name: 'TagsComponents',

  data() {
    return {
      newTag: null,
    }
  },

  computed: {
    ...mapState('articleManagement', ['article', 'tags']),
  },

  created() {
    this.getTags()
  },

  methods: {
    getArraysMutualObjects,
    ...mapActions('articleManagement', [
      'getTags',
      'addNewTagToTheList',
      'setArticleData',
    ]),

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
