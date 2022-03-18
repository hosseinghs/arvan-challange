import { createObjWithDefaultValues } from '~/utils/general'

export class Queries {
  constructor(options) {
    const defaults = {
      limit: 10,
      offset: 0,
    }
    createObjWithDefaultValues(this, defaults, options)
  }
}