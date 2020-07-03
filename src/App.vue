<template>
  <v-app :dark="true">
    <NavBar></NavBar>
    <v-main>
      <v-container fluid >
        <Main class="ma-1"></Main>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import NavBar from './components/Nav'
import Main from './views/Main'

export default {
  name: 'App',

  components: {
    NavBar,
    Main
  },

  data: () => ({
    //
  })
}
</script>
