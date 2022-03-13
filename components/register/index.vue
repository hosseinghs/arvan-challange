<template>
  <b-card class="_register_wrapper">
    <b-card-title class="card-title">
      {{ title }}
    </b-card-title>
    <b-form @submit.prevent="submitForm()" @reset="resetForm()">
      <b-card-text>
        <FormInput
          label="User"
          type="text"
          @change="setUserData({ k: 'user', v: $event })"
        />
      </b-card-text>

      <b-card-text>
        <FormInput
          label="Email"
          type="email"
          @change="setUserData({ k: 'email', v: $event })"
        />
      </b-card-text>

      <b-card-text>
        <FormInput
          label="Password"
          type="password"
          @change="setUserData({ k: 'password', v: $event })"
        />
      </b-card-text>

      <b-button type="submit" class="w-100" variant="primary">
        Register
      </b-button>
      <div class="mt-2">
        Already Registered?
        <NuxtLink to="/login">
          <strong> Login</strong>
        </NuxtLink>
      </div>
    </b-form>
  </b-card>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'RegisterAndLoginComponent',
  props: {
    title: {
      type: String,
      default: 'Register',
      required: false,
    },
  },
  computed: {
    ...mapState('register', ['user']),
  },
  beforeDestroy() {
    this.clearUserState()
  },
  methods: {
    ...mapActions('register', ['setUserData', 'clearUserState','registerUser']),
    resetForm() {
      console.log('reset')
    },
    submitForm() {
      this.registerUser()
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
