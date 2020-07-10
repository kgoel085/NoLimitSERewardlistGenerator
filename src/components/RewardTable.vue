<template>
  <div>
    <v-card class="ma-2" v-if="dataLoaded">
      <v-card-title>Day {{ dataObj.day }}</v-card-title>
      <v-card-text>
        <v-simple-table fixed-header height="390">
          <template v-slot:default>
            <thead>
              <tr>
                <th>Race number</th>
                <th>Material Category</th>
                <th>Material Type</th>
                <th>Material Rewards</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="race in dataObj.races" :key="race.id">
                <td>{{race.id}}</td>
                <td>{{ getName('category', race) }} - {{ getName('catType', race) }}</td>
                <td>{{ getName('mType', race) }}</td>
                <td>
                  <template v-if="race.items !== null && race.items.constructor === Array && race.items.length > 0">
                    <v-select
                      placeholder="Select input"
                      :items="getDropDownOptions(race)"
                      item-text="name"
                      item-value="name"
                      v-model="race.value"
                      :clearable="(getRowId) ? false : true"
                      :disabled="(getRowId) ? true : false"
                      @input="handleEvents(dataObj)"
                    ></v-select>
                  </template>
                  <template v-else>
                    <!-- <span :class="(race.value !== null && race.value.length > 0) ? 'text-center' : ''" v-html="(race.value !== null && race.value.length > 0) ? race.value : 'N/A'"></span> -->
                    <span v-html="getRacePartName(race)"></span>
                  </template>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card-text>
    </v-card>
    <v-alert v-else type="info">
      No data provided !
    </v-alert>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  data: () => ({

  }),
  computed: {
    ...mapGetters({
      mData: 'Material/getData', // Material Data
      mTypeData: 'MaterialType/getData', // Material Type Data
      mCatData: 'MaterialCategory/getData', // Material Category Data
      mCatTypeData: 'MaterialCategoryType/getData', // Material Category Data
      perfPartData: 'PerformancePart/getData', // Performance Parts Data
      eventRewardTpl: 'EventRewardTemplate/getData', // Event reward Template Data
      eventRewardInputArr: 'EventRewardTemplate/getInputData', // Event reward Template Data
      getRowId: 'CarList/getRowId' // Get active document id, if present
    }),

    // Data loaded or not
    dataLoaded () {
      if (this.dataObj !== null && typeof this.dataObj === 'object' && Object.keys(this.dataObj).length > 0) return true
      return false
    },

    // Data to render
    dataObj () {
      return this.rewardTemplate
    }
  },
  methods: {
    ...mapMutations({
      updateTplValue: 'EventRewardTemplate/updateTplValue'
    }),

    // Get value for the frontend
    getName (section = null, valObj = null) {
      let returnVal = '-'
      let findArr = null
      let val = null

      switch (section) {
        // Material category
        case 'category':
          findArr = this.mCatData
          val = valObj.category
          break

        // Material category type
        case 'catType':
          findArr = this.mCatTypeData
          val = valObj.category_type
          break

        // Material type
        case 'mType':
          findArr = this.mTypeData
          val = valObj.material_type
          break
      }

      if (findArr !== null && findArr.constructor === Array && findArr.length > 0 && val !== null) {
        const findObj = findArr.find(obj => obj.id === val)
        if (findObj !== null && typeof findObj !== 'undefined' && findObj.constructor === Object && Object.keys(findObj).length > 0) returnVal = findObj.name
      }

      return returnVal
    },

    // Get selection dropdown values
    getDropDownOptions (obj = {}) {
      let returnVal = []
      if (obj !== null && Object.keys(obj).length > 0) {
        const { category, material_type: materialType } = obj
        const itemObj = this.mData.filter(obj => obj.category === category && obj.type === materialType)

        if (itemObj && itemObj.constructor === Array && itemObj.length > 0) returnVal = [...itemObj]
      }

      return returnVal
    },

    // Trigger the request to calculate material
    handleEvents (dataToSend = {}) {
      const { races } = dataToSend

      // Convert undefined values to null
      dataToSend.races = races.map(obj => {
        const { value } = obj
        if (typeof value === 'undefined') obj.value = null
        return obj
      })
      this.$store.commit('EventRewardTemplate/calculateRewardItems', dataToSend)
    },

    // Handle part value to output based on index
    getPartValueFromIndex (category = null, categoryType = null, materialType = null) {
      const selArr = this.eventRewardInputArr

      let returnVal = null
      const valMapping = {
        1: {
          1: {
            1: 0,
            2: 16
          },
          2: {
            1: 6,
            2: 10
          }
        },
        2: {
          1: {
            1: 2,
            2: 12
          },
          2: {
            1: 1,
            2: 14
          }
        },
        3: {
          1: {
            1: 4,
            2: 11
          },
          2: {
            1: 15,
            2: 8
          }
        }
      }

      if (Object.keys(valMapping).includes(category) && Object.keys(valMapping[category]).length > 0 && Object.keys(valMapping[category]).includes(categoryType) && valMapping[category][categoryType] && Object.keys(valMapping[category][categoryType]).includes(materialType) && parseInt(valMapping[category][categoryType][materialType]) >= 0) returnVal = selArr[valMapping[category][categoryType][materialType]].value

      return returnVal
    },

    // Get race part name based on provided input
    getRacePartName (race) {
      let returnVal = 'N/A'

      let { category, category_type: categoryType, material_type: materialType } = race
      if (category) category = category.toString()
      if (categoryType) categoryType = categoryType.toString()
      if (materialType) materialType = materialType.toString()
      const selArr = this.eventRewardInputArr

      const { id } = race
      switch (parseInt(id)) {
        case 4:
        case 10:
          if (selArr[0].value === 'Flywheel') returnVal = 'Flywheel'
          else if (selArr[0].value === 'Thrust Sleeve') returnVal = 'Thrust Sleeve'
          break

        case 6:
        case 17:
          if (selArr[0].value === 'Flywheel') returnVal = 'Intake'
          else if (selArr[0].value === 'Thrust Sleeve') returnVal = 'Backplate'
          break

        case 7:
        case 14:
        case 18:
          if (selArr[0].value === 'Flywheel') returnVal = 'Thrust Sleeve'
          else if (selArr[0].value === 'Thrust Sleeve') returnVal = 'Flywheel'
          break

        case 8: {
          if (selArr[2].value === 'Input Shaft') returnVal = 'Input Shaft'
          else if (selArr[2].value === 'Tread') returnVal = 'Tread'
          break
        }

        case 9: {
          if (selArr[4].value === 'Thermosensor') returnVal = 'Tank'
          else if (selArr[4].value === 'Valve') returnVal = 'Harness'
          break
        }

        case 11:
          if (selArr[0].value === 'Flywheel') returnVal = 'Backplate'
          else if (selArr[0].value === 'Thrust Sleeve') returnVal = 'Intake'
          break

        case 12:
          if (selArr[4].value === 'Thermosensor') returnVal = 'Harness'
          else if (selArr[4].value === 'Valve') returnVal = 'Tank'
          break

        case 13:
          if (selArr[2].value === 'Input Shaft') returnVal = 'Clutch Plate'
          else if (selArr[2].value === 'Tread') returnVal = 'Brake Disk'
          break

        case 15:
          if (selArr[1].value === 'Input Shaft') returnVal = 'Clutch Plate'
          else if (selArr[1].value === 'Tread') returnVal = 'Brake Disk'
          break

        case 16:
          if (selArr[4].value === 'Thermosensor') returnVal = 'Valve'
          else if (selArr[4].value === 'Valve') returnVal = 'Thermosensor'
          break

        case 19:
        case 20:
        case 21:
        case 22:
        case 23:
        case 24:
        case 26:
        case 28:
        case 32:
        case 33:
        case 35:
        case 36:
        case 37:
        case 38:
        case 39:
        case 40:
        case 41:
        case 42:
        case 43:
        case 44:
        case 45:
        case 46:
        case 47:
        case 48:
        case 49:
        case 50:
        case 51:
        case 52:
        case 53:
        case 54:
        case 55:
        case 56:
        case 57:
        case 58:
        case 59:
        case 60:
        case 61:
        case 63:
        case 64:
        case 66:
          returnVal = this.getPartValueFromIndex(category, categoryType, materialType)
          break
        case 25:
          if (parseInt(category) === 1 && parseInt(categoryType) === 2 && parseInt(materialType) === 3) {
            if (selArr[6].value === 'Thrust Sleeve') returnVal = 'Turbo Upgrade Kit 1'
            else if (selArr[6].value === 'Flywheel') returnVal = 'Engine Upgrade Kit 1'
          }
          break
        case 27:
          if (parseInt(category) === 3 && parseInt(categoryType) === 2 && parseInt(materialType) === 3) {
            if (selArr[15].value === 'Thermosensor') returnVal = 'ECU Upgrade Kit 1'
            else if (selArr[15].value === 'Valve') returnVal = 'Nitro Upgrade Kit 1'
          }
          break
        case 29:
        case 62:
          if (parseInt(category) === 2 && parseInt(categoryType) === 1 && parseInt(materialType) === 3) {
            if (selArr[2].value === 'Input Shaft') returnVal = 'Gearbox Upgrade Kit 1'
            else if (selArr[2].value === 'Tread') returnVal = 'Wheel Upgrade Kit 1'
          }
          break
        case 30:
          if (parseInt(category) === 2 && parseInt(categoryType) === 2 && parseInt(materialType) === 3) {
            if (selArr[1].value === 'Tread') returnVal = 'Wheel Upgrade Kit 1'
            else if (selArr[1].value === 'Input Shaft') returnVal = 'Gearbox Upgrade Kit 1'
          }
          break
        case 31:
        case 65:
          if (parseInt(category) === 3 && parseInt(categoryType) === 1 && parseInt(materialType) === 3) {
            if (selArr[4].value === 'Thermosensor') returnVal = 'ECU Upgrade Kit 1'
            else if (selArr[4].value === 'Valve') returnVal = 'Nitro Upgrade Kit 1'
          }
          break
        case 34:
          if (parseInt(category) === 1 && parseInt(categoryType) === 1 && parseInt(materialType) === 3) {
            if (selArr[0].value === 'Thrust Sleeve') returnVal = 'Turbo Upgrade Kit 1'
            else if (selArr[0].value === 'Flywheel') returnVal = 'Engine Upgrade Kit 1'
          }
          break
        case 67:
          returnVal = 'Cash / Gold'
          break
      }

      const findObj = this.rewardTemplate.races.findIndex(obj => obj.id === race.id)
      if (returnVal === 'N/A') returnVal = null
      if (parseInt(findObj) >= 0) this.updateTplValue({ index: findObj, day: this.dataObj.day, value: returnVal })

      if (returnVal === null) returnVal = 'N/A'
      return returnVal
    }
  },
  props: {
    // Data to view
    rewardTemplate: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style>

</style>
