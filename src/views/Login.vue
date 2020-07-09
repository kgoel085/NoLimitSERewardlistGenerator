<template>
  <v-card :loading="loading">
    <v-card-title class="primary" color="white">
      Login
      <v-spacer></v-spacer>
      <v-btn x-small fab class="error" @click="setShowLoginModel(false)">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-text>
      <v-form v-model="formValidated" ref="loginForm" @keyup.native.enter="triggerLogin">
        <v-layout row wrap class="pa-1">
          <v-flex xs12 v-for="(field, index) in dataFields" :key="index">
            <v-text-field
              :label="field.label"
              :type="field.type"
              :rules="field.rules"
              v-model="field.value"
            ></v-text-field>
          </v-flex>
        </v-layout>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn class="primary" :disabled="!formValidated" @click="triggerLogin" :loading='loading'>
        Login <v-icon>mdi-login</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import { mapMutations, mapGetters } from 'vuex'
export default {
  data: () => ({
    formValidated: false, // Form is validated or not
    loading: false,
    dataFields: {
      email: {
        label: 'Email',
        type: 'email',
        placeholder: 'Enter your email',
        rules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+/.test(v) || 'E-mail must be valid'
        ],
        value: null
      },
      password: {
        label: 'Password',
        type: 'password',
        placeholder: 'Enter your password',
        rules: [
          v => !!v || 'Password is required',
          v => (!!v && v.length >= 10) || 'Password must be at least 10 characters'
        ],
        value: null
      }
    }
  }),
  computed: {
    ...mapGetters({
      snackBar: 'getSnackBar' // Get snackbar object
    })
  },
  methods: {
    ...mapMutations(['setShowLoginModel']),
    // Trigger firebase login
    triggerLogin () {
      const emailCred = {}
      for (const key of Object.keys(this.dataFields)) emailCred[key] = this.dataFields[key].value
      const { email, password } = emailCred

      this.loading = true
      this.$__firebase.fireauth.signInWithEmailAndPassword(email, password).then(resp => {
        const { user } = resp
        this.$store.commit('User/setUserData', user) // Save user data
        this.setShowLoginModel(false)
        this.snackBar.info('User logged in.')
      }).catch(err => {
        this.$refs.loginForm.reset()
        this.snackBar.info(err.message)
      }).finally(() => {
        this.loading = false
      })
    }
  },
  beforeDestroy () {
    this.$refs.loginForm.reset() // Reset login form, when ever component is re-rendered
    this.formValidated = false
    this.$refs.loginForm = null
  }
}
</script>

<style>

</style>
