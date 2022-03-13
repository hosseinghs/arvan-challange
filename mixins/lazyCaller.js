export default {
  data() {
    return {
      timeout: null,
    }
  },
  methods: {
    lazyCaller(fn, time = 250) {
      if (time === 0) return fn()
      else {
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          fn()
        }, time)
      }
    },
  },
}
