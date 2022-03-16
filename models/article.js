import { createObjWithDefaultValues } from '~/utils/general'

export class User {
  constructor(options) {
    const defaults = {
      title: null,
      description: null,
      body: null,
      tagList: [],
    }
    createObjWithDefaultValues(this, defaults, options)
  }
}
