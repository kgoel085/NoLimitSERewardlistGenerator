<template>
  <v-layout row wrap>
    <!-- Selection block -->
    <v-flex xs12 md6 class="pa-1">
      <v-card class="ma-2">
        <v-card-title>Select Car</v-card-title>
        <v-card-text>
          <v-select
            :items="[]"
          ></v-select>
        </v-card-text>
      </v-card>
    </v-flex>
    <!-- Save selection block -->
    <v-flex xs12 md6 class="pa-1" v-if="fireUser !== null">
      <v-card class="ma-2">
        <v-card-title>Save current selection for </v-card-title>
        <v-card-text>
          <v-row class="px-2">
            <v-flex class="grow">
              <v-text-field placeholder="Name of car"></v-text-field>
            </v-flex>
            <v-flex class="shrink">
              <v-btn class="shrink">Save</v-btn>
            </v-flex>
          </v-row>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data: () => ({}),
  computed: {
    ...mapGetters({
      fireUser: 'User/getUserData' // Fire user user
    })
  }
}
</script>

<style>

</style>
