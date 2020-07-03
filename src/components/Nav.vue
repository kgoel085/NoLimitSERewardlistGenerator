<template>
  <v-app-bar
      app
      color="primary"
      dark
      class="navbarr"
    >
      <div class="d-flex align-center">
        NFS No Limits
      </div>

      <v-spacer></v-spacer>
      <!-- <v-tooltip bottom>
        <template v-slot:activator="on">
          <v-btn v-model="setDarkModeVal" @click="setDarkModeVal = !setDarkModeVal" v-on="on">
            <v-icon :dark="setDarkModeVal">mdi-flare</v-icon>
          </v-btn>
        </template>
        <span>Change Theme</span>
      </v-tooltip> -->
    </v-app-bar>
</template>

<script>
// import { mapGetters, mapMutations } from 'vuex'
export default {
  // computed: {
  //   ...mapGetters(['isDarkMode']),
  //   setDarkModeVal: {
  //     get () {
  //       return this.isDarkMode
  //     },
  //     set (val) {
  //       this.$vuetify.theme.dark = !val
  //       this.setDarkMode(val)
  //     }
  //   }
  // },
  // methods: {
  //   ...mapMutations(['setDarkMode'])
  // },
  // mounted () {
  //   // this.$vuetify.theme.dark = this.setDarkMode
  // }
}
</script>

<style>
  .navbarr {
    font-family: "NFS";
  }
</style>
