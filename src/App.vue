<template>
  <v-app :dark="true">
    <NavBar></NavBar>
    <v-main>
      <v-container fluid >
        <Main class="ma-1"></Main>
      </v-container>

      <!-- Login Button -->
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
            @click="setShowLoginModel(!showLoginModel)"
          ><v-icon>mdi-login</v-icon></v-btn>
        </template>
        <span class="loginLbl">Login ( Only for Admins ) </span>
      </v-tooltip>

      <!-- Login Model -->
      <v-dialog v-model="showLoginModel" width="30%" @input="setShowLoginModel(!showLoginModel)" :overlay-color="(isDarkMode) ? '#000' : '#ccc'" class="elevation-6">
        <Login v-if="showLoginModel"></Login>
      </v-dialog>

    </v-main>
  </v-app>
</template>

<script>
import NavBar from './components/Nav'
import Main from './views/Main'
import Login from './views/Login'

import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'App',
  components: {
    NavBar,
    Main,
    Login
  },
  data: () => ({}),
  computed: {
    ...mapGetters(['showLoginModel', 'isDarkMode'])
  },
  methods: {
    ...mapMutations(['setShowLoginModel'])
  }
}
</script>

<style scoped>
  .loginLbl { font-size: 20px }
</style>
