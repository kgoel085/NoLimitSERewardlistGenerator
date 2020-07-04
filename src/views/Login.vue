<template>
  <v-card>
    <v-card-title class="primary" color="white">
      Login
      <v-spacer></v-spacer>
      <v-btn x-small fab class="error" @click="setShowLoginModel(false)">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-text>
      <v-form v-model="formValidated">
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
      <v-btn class="primary">
        Login <v-icon>mdi-login</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
  data: () => ({
    formValidated: false, // Form is validated or not
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
  methods: {
    ...mapMutations(['setShowLoginModel'])
  },
  mounted () {
  },
  beforeDestroy () {
    this.dataFields.email.value = null
    this.dataFields.password.value = null
  }
}
</script>

<style>

</style>
