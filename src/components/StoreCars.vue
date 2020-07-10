<template>
  <v-layout row wrap>
    <!-- Selection block -->
    <v-flex class="pa-1 grow">
      <v-card class="ma-2">
        <v-card-title>
          <v-layout row wrap>
            <v-flex class="grow px-2">
              Select Car
            </v-flex>
            <v-flex class="shrink px-2" v-if="rowId && fireUser !== null">
              <v-btn text class="elevation-2 primary" @click="askConfirmation" :loading="loading">Delete selected</v-btn>
            </v-flex>
          </v-layout>
        </v-card-title>
        <v-card-text>
          <template v-if="carListData.length === 0">
            <v-alert type="info">No data found !</v-alert>
          </template>
          <template v-if="carListData.length > 0">
            <v-combobox
              return-object
              clearable
              :items="carListData"
              item-text="name"
              item-value="id"
              placeholder="Select a car"
              @input="loadCarValues"
            ></v-combobox>
          </template>
        </v-card-text>
      </v-card>
    </v-flex>
    <!-- Save selection block -->
    <v-flex class="pa-1 grow" v-if="fireUser !== null">
      <v-card class="ma-2">
        <v-card-title>{{ (rowId) ? 'Edit' : 'Save' }} current selection for </v-card-title>
        <v-card-text>
          <v-row class="px-2">
            <v-flex class="grow">
              <v-text-field placeholder="Name of car" v-model="carName" @input="carNameChanged = true" @change="carNameChanged = true"></v-text-field>
            </v-flex>
            <v-flex class="shrink">
              <v-btn class="shrink primary" :disabled="!allInputsPresent" @click="saveData">Save</v-btn>
            </v-flex>
          </v-row>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-dialog v-model="showConfirmBox" @input="showConfirmBox = !showConfirmBox" width="30%">
      <v-card :loading="loading">
        <v-card-title>Delete {{carName}} ?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="success" @click="deleteRecord(rowId)" :loading="loading">Confirm</v-btn>
          <v-btn class="error" @click="showConfirmBox = false" :loading="loading">Decline</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  data: () => ({
    loading: false,
    carName: null,
    rowId: null,
    selCarVal: null,
    showConfirmBox: false,
    carNameChanged: false
  }),
  computed: {
    ...mapGetters({
      fireUser: 'User/getUserData', // Fire user user
      carListData: 'CarList/getData', // Get car list data
      userInputData: 'EventRewardTemplate/getInputData', // Get user input data
      snackBar: 'getSnackBar' // Get snackbar object
    }),
    // Check whether all inputs are present or not
    allInputsPresent () {
      const [{ value: sel1 }, { value: sel2 }, { value: sel3 }, , { value: sel4 }] = this.userInputData // User input data
      if (sel1 !== null && sel2 !== null && sel3 !== null && sel4 !== null) return true

      return false
    }
  },
  watch: {
    carName (val) {
      if (!val || val === null || typeof val === 'undefined') this.carNameChanged = false
    }
  },
  methods: {
    ...mapMutations({
      updateTplValue: 'EventRewardTemplate/updateTplValue',
      setRowId: 'CarList/setRowId' // Set active document id
    }),
    ...mapActions({
      saveItem: 'CarList/saveData', // Save car data
      deleteItem: 'CarList/deleteData' // Delete car data
    }),

    // Load the clicked car values
    loadCarValues (obj) {
      if (!obj || typeof obj === 'undefined') return this.resetSelection()
      const { name, values } = obj
      this.carName = name
      if (Object.keys(obj).includes('id')) {
        this.setRowId(obj.id)
        this.rowId = obj.id
      }

      const [sel1, sel2, sel3, sel4] = values
      this.triggerUpdateVal(sel1, sel2, sel3, sel4)
    },

    /**
     * Reset component
     */
    resetSelection () {
      this.setRowId(null)
      this.rowId = null
      this.selCarVal = null
      this.carName = null
      this.triggerUpdateVal() // Empty out the selected values
      if (this.showConfirmBox) this.showConfirmBox = false // Hide delete confirmation box, if visible
      this.carNameChanged = false
      return false
    },

    /**
     * Update values for the selected car
     */
    triggerUpdateVal (sel1 = null, sel2 = null, sel3 = null, sel4 = null) {
      this.updateTplValue({ index: 0, day: 1, value: sel1 })
      this.updateTplValue({ index: 1, day: 1, value: sel2 })
      this.updateTplValue({ index: 2, day: 1, value: sel3 })
      this.updateTplValue({ index: 4, day: 1, value: sel4 })
    },

    // Check existence
    checkExists (name = null) {
      if (name === null || typeof name === 'undefined') return false

      const findCar = this.carListData.find(obj => obj.name === name)
      if (findCar && findCar !== null && typeof findCar !== 'undefined') return true

      return false
    },

    // Save data
    saveData () {
      if (this.carNameChanged) {
        const checkExists = this.checkExists(this.carName)
        if (checkExists === true) {
          this.snackBar.error('Car name already exists !')
          return false
        }
      }

      // Save data to DB
      const [{ value: sel1 }, { value: sel2 }, { value: sel3 }, , { value: sel4 }] = this.userInputData // User input data
      const dataToSave = {
        values: [sel1, sel2, sel3, sel4],
        name: this.carName,
        id: this.rowId
      }
      return this.saveItem(dataToSave)
        .then(data => {
          this.snackBar.info('Data saved successfully.')
          this.resetSelection()
        })
        .catch(err => {
          this.snackBar.error(err.message)
        })
    },

    // Delete data
    deleteRecord (rowId = null) {
      if (typeof rowId === 'undefined' || rowId === null) {
        this.snackBar.error('Please provide a valid identifier to continue !')
        return false
      }

      this.loading = true
      return this.deleteItem(rowId)
        .then(data => {
          this.snackBar.info('Record deleted successfully.')
          this.resetSelection()
        })
        .catch(err => {
          this.snackBar.error(err.message)
        })
        .finally(() => {
          this.loading = false
        })
    },

    // Delete data confirmation
    askConfirmation (rowId = null) {
      if (rowId === null || typeof rowId === 'undefined') {
        this.snackBar.error('Please provide a valid identifier to continue !')
        return false
      }
      this.showConfirmBox = true
    }
  }
}
</script>

<style>

</style>
