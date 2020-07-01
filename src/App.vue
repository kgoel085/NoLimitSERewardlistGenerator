<template>
  <v-app>
    <NavBar></NavBar>
    <v-main>
      <v-container>
        <Main></Main>
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
