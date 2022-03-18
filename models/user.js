import { createObjWithDefaultValues } from '~/utils/general'

export class RegisterData {
  constructor(options) {
    const defaults = {
      username: null,
      email: null,
      password: null,
    }
    createObjWithDefaultValues(this, defaults, options)
  }
}

export class LoginData {
  constructor(options) {
    const defaults = {
      email: null,
      password: null,
    }
    createObjWithDefaultValues(this, defaults, options)
  }
}
