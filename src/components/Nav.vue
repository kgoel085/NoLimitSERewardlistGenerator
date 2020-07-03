<template>
  <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <span class="nfs_font px-2">NFS No Limits </span> ( Material List and Kit info generator by <a class="secondary pa-1" href="https://www.reddit.com/r/nfsnolimits/comments/hdxk6h/special_event_material_rewardskits_info_generator/?utm_source=share&utm_medium=web2x">  Tar-Ton (u/Tar-Ton) </a> )
      </div>
      <v-spacer></v-spacer>
      <span class="pa-1">This interface developed by: <a class="secondary pa-1" href="https://www.reddit.com/user/kgoel085/">kgoel085 (u/kgoel085)</a></span>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn @click="setDarkModeVal = !setDarkModeVal" v-bind="attrs" v-on="on">
            <v-icon :dark="!setDarkModeVal">mdi-{{ (!setDarkModeVal) ? 'white-balance-sunny' : 'moon-waxing-crescent' }}</v-icon>
          </v-btn>
        </template>
        <span>Switch theme</span>
      </v-tooltip>
      <!-- <v-menu
        v-model="showCreditModel"
        :nudge-width="200"
        :nudge-bottom="30"
        bottom
        open-on-hover
        offset-x
      >
        <template v-slot:activator="{ on }">
          <v-btn class="mx-2" v-on="on">
            <v-icon>mdi-star</v-icon> Credits
          </v-btn>
        </template>
        <v-list nav rounded avatar>
          <v-list-item>
            <v-list-item-avatar>
              <v-icon class="deep-orange text--white" color="white">mdi-reddit</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title >Original Idea by: <a href="https://www.reddit.com/user/Tar-Ton/">Tar-Ton (u/Tar-Ton)</a></v-list-item-title>
              <v-list-item-subtitle>Visit original post here:  <a href="https://www.reddit.com/r/nfsnolimits/comments/hdxk6h/special_event_material_rewardskits_info_generator/?utm_source=share&utm_medium=web2x">Material List and Kit info generator by u/Tar-Ton</a><br>This interface developed by: <a href="https://www.reddit.com/user/kgoel085/">kgoel085 (u/kgoel085)</a></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu> -->
    </v-app-bar>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  data: () => ({
    showCreditModel: true // Show credits model
  }),
  computed: {
    ...mapGetters(['isDarkMode']),
    setDarkModeVal: {
      get () {
        return this.isDarkMode
      },
      set (val) {
        this.$vuetify.theme.dark = !val
        this.setDarkMode(val)
      }
    }
  },
  methods: {
    ...mapMutations(['setDarkMode'])
  },
  mounted () {
    // this.$vuetify.theme.dark = this.setDarkMode
  }
}
</script>

<style>
  .nfs_font {
    font-family: "NFS";
  }
</style>
