import { createObjWithDefaultValues } from '~/utils/general'

export class User {
  constructor(options) {
    const defaults = {
      username: null,
      email: null,
      password: null,
    }
    createObjWithDefaultValues(this, defaults, options)
  }
}