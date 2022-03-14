import { createObjWithDefaultValues } from '~/utils/general'

export class WarningGenerator {
  constructor(options) {
    const defaults = {
      title: null,
      text: null,
    }
    createObjWithDefaultValues(this, defaults, options)
  }
}