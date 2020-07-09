<template>
  <v-app :dark="isDarkMode">
    <NavBar></NavBar>
    <v-main>
      <v-container fluid >
        <SnackBar ref="snackbar" baseSize="100px" :wrapClass="''" :holdTime="3000" :multiple="true"/>
        <Main class="ma-1"></Main>
      </v-container>

      <!-- Login / Logout Button -->
      <v-tooltip left color="primary">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            x-large
            fixed
            bottom
            right
            fab
            v-bind="attrs"
            v-on="on"
            class="primary elevation-6"
            @click="(fireUser) ? $store.dispatch('User/signUserOut') : setShowLoginModel(!showLoginModel)"
          ><v-icon>mdi-{{ (fireUser) ? 'logout' : 'login' }}</v-icon></v-btn>
        </template>
        <span class="loginLbl">{{ (fireUser) ? 'Logout' : 'Login ( Only for Admins )' }}  </span>
      </v-tooltip>

      <!-- Login Model -->
      <v-dialog v-if="showModel" :value="true" width="30%" class="elevation-6" @input="showModel = !showModel" persistent>
        <Login v-if="showModel"></Login>
      </v-dialog>
    </v-main>
  </v-app>
</template>

<script>
import NavBar from './components/Nav'
import Main from './views/Main'
import Login from './views/Login'
import SnackBar from 'vuejs-snackbar'

import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'App',
  components: {
    NavBar,
    Main,
    Login,
    SnackBar
  },
  data: () => ({}),
  computed: {
    ...mapGetters(['showLoginModel', 'isDarkMode']),
    ...mapGetters({
      fireUser: 'User/getUserData' // Get user data
    }),
    showModel: {
      get () {
        return this.showLoginModel
      },
      set (val) {
        this.setShowLoginModel(val)
      }
    }
  },
  methods: {
    ...mapMutations(['setShowLoginModel'])
  },
  beforeMount () {
    this.$vuetify.theme.dark = this.isDarkMode
    this.$store.commit('setDarkMode', this.isDarkMode)
  },
  mounted () {
    this.$store.commit('setSnackBarObj', this.$refs.snackbar) // Store ref to loaded snackbar
    this.$vuetify.theme.dark = this.isDarkMode
    this.$store.commit('setDarkMode', this.isDarkMode)
  }
}
</script>

<style scoped>
  .loginLbl { font-size: 20px }
</style>
