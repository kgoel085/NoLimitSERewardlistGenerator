<template>
  <v-layout row wrap>
    <!-- Selection block -->
    <v-flex class="pa-1 grow">
      <v-card class="ma-2">
        <v-card-title>Select Car</v-card-title>
        <v-card-text>
          <template v-if="carListData.length === 0">
            <v-alert type="info">No data found !</v-alert>
          </template>
          <template v-if="carListData.length > 0"></template>
        </v-card-text>
      </v-card>
    </v-flex>
    <!-- Save selection block -->
    <v-flex class="pa-1 grow" v-if="fireUser !== null">
      <v-card class="ma-2">
        <v-card-title>Save current selection for </v-card-title>
        <v-card-text>
          <v-row class="px-2">
            <v-flex class="grow">
              <v-text-field placeholder="Name of car" v-model="carName"></v-text-field>
            </v-flex>
            <v-flex class="shrink">
              <v-btn class="shrink" :disabled="!allInputsPresent">Save</v-btn>
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
  data: () => ({
    carName: null
  }),
  computed: {
    ...mapGetters({
      fireUser: 'User/getUserData', // Fire user user
      carListData: 'CarList/getData', // Get car list data
      userInputData: 'EventRewardTemplate/getInputData' // Get user input data
    }),
    // Check whether all inputs are present or not
    allInputsPresent () {
      const [{ value: sel1 }, { value: sel2 }, { value: sel3 }, , { value: sel4 }] = this.userInputData // User input data
      if (sel1 !== null && sel2 !== null && sel3 !== null && sel4 !== null) return true

      return false
    }
  },
  methods: {
    // Check existence
    checkExists (name = null) {
      if (name === null || typeof name === 'undefined') return false
    },

    // Save data
    saveData () {}
  }
}
</script>

<style>

</style>
