<template>
  <b-col cols="11" md="6" lg="4" xl="3">
    <b-card class="_register_wrapper">
      <b-card-title class="card-title"> Login </b-card-title>
      <b-form @submit.prevent="submitForm()">
        <b-card-text>
          <FormInput
            label="Email"
            type="email"
            err-msg="Required field"
            :valid-state="isEmailValid"
            @change="setUserData({ k: 'email', v: $event })"
          />
        </b-card-text>

        <b-card-text>
          <FormInput
            label="Password"
            type="password"
            err-msg="Required field"
            :valid-state="isPasswordValid"
            @change="setUserData({ k: 'password', v: $event })"
          />
        </b-card-text>

        <b-button type="submit" class="w-100" variant="primary">
          Login
        </b-button>
        <div class="mt-2">
          Don't have account?
          <NuxtLink to="/">
            <strong> Register Now</strong>
          </NuxtLink>
        </div>
      </b-form>
    </b-card>
  </b-col>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'IndexPage',
  layout: 'register',
  computed: {
    ...mapState('register', ['user']),
    isEmailValid: {
      get() {
        if (this.user.email !== null) return !!this.user.email
        else return null
      },
      set(val) {
        this.setUserData({ k: 'email', v: val })
      },
    },
    isPasswordValid: {
      get() {
        if (this.user.password !== null) return !!this.user.password
        else return null
      },
      set(val) {
        this.setUserData({ k: 'password', v: val })
      },
    },
  },
  beforeDestroy() {
    this.clearUserState()
  },
  methods: {
    ...mapActions('register', ['setUserData', 'clearUserState', 'login']),
    async submitForm() {
      if (this.isEmailValid && this.isPasswordValid) {
        const res = await this.login()
        if (res) this.$router.push({ path: '/article' })
      } else {
        this.isEmailValid = false
        this.isPasswordValid = false
      }
    },
  },
}
</script>
<style scoped>
._register_wrapper {
  background-color: #eceeef;
}

.card-title {
  font-family: HelveticaNeue;
  font-size: 47px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  letter-spacing: normal;
  text-align: left;
  color: #707070;
  text-align: center;
}
</style>
