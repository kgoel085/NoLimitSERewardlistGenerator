<template>
  <v-card class="ma-2">
    <v-card-title>Reward List</v-card-title>
    <v-card-text>
      <v-simple-table dense fixed-header height="390">
        <template v-slot:default>
          <thead>
            <tr>
              <th>Material</th>
              <th>4 Stars</th>
              <th>5 Stars</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="material in rewardListArr" :key="material.id">
              <td>{{material.name}}</td>
              <td>{{material.base - material.subtract}}</td>
              <td>{{(material.base + 4) - material.subtract}}</td>
            </tr>
            <tr>
              <td>Conversion Kits</td>
              <td colspan="2">{{ getRewardKits }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data: () => ({
    rewardKits: 'N/A'
  }),
  computed: {
    ...mapGetters({
      mData: 'Material/getData', // Material Data
      eventRewardInputArr: 'EventRewardTemplate/getInputData' // Event reward Template Data
    }),
    rewardListArr () {
      const returnVal = []
      this.eventRewardInputArr.map(obj => obj.value)
      for (const material of this.mData) {
        const finalObj = this.getActualRewardCount(material)
        returnVal.push(finalObj)
      }

      return returnVal
    },
    getRewardKits () {
      return this.rewardKits
    }
  },
  methods: {
    // Calculate the reward quantity
    getActualRewardCount (material = {}) {
      const selArr = this.eventRewardInputArr.map(obj => obj.value)
      const { name } = material

      switch (name) {
        case 'Flywheel': {
          if (selArr[0] === 'Flywheel') material.subtract = 4
          else if (selArr[0] === 'Thrust Sleeve') material.subtract = 6
          else material.subtract = 0
          break
        }

        case 'Thrust Sleeve': {
          if (selArr[0] === 'Thrust Sleeve') material.subtract = 4
          else if (selArr[0] === 'Flywheel') material.subtract = 6
          else material.subtract = 0
          break
        }

        case 'Input Shaft': {
          if (selArr[1] === 'Input Shaft' || selArr[1] === 'Tread') material.subtract = 5
          else material.subtract = 0
          break
        }

        case 'Tread': {
          if (selArr[1] === 'Input Shaft' || selArr[1] === 'Tread') material.subtract = 5
          else material.subtract = 0
          break
        }

        case 'Thermosensor': {
          if (selArr[4] === 'Thermosensor') material.subtract = 7
          else if (selArr[4] === 'Valve') material.subtract = 5
          else material.subtract = 0
          break
        }

        case 'Valve': {
          if (selArr[4] === 'Valve') material.subtract = 7
          else if (selArr[4] === 'Thermosensor') material.subtract = 5
          else material.subtract = 0
          break
        }

        case 'Intake': {
          if (selArr[5] === 'Intake') material.subtract = 2
          else if (selArr[5] === 'Backplate') material.subtract = 6
          else material.subtract = 0
          break
        }

        case 'Backplate': {
          if (selArr[5] === 'Backplate') material.subtract = 2
          else if (selArr[5] === 'Intake') material.subtract = 6
          else material.subtract = 0
          break
        }

        case 'Clutch Plate': {
          if (selArr[12] === 'Clutch Plate') material.subtract = 5
          else if (selArr[12] === 'Brake Disc') material.subtract = 4
          else material.subtract = 0
          break
        }

        case 'Brake Disc': {
          if (selArr[12] === 'Brake Disc') material.subtract = 5
          else if (selArr[12] === 'Clutch Plate') material.subtract = 4
          else material.subtract = 0
          break
        }

        case 'Harness': {
          if (selArr[8] === 'Harness') material.subtract = 5
          else if (selArr[8] === 'Tank') material.subtract = 4
          else material.subtract = 0
          break
        }

        case 'Tank': {
          if (selArr[8] === 'Tank') material.subtract = 5
          else if (selArr[8] === 'Harness') material.subtract = 4
          else material.subtract = 0
          break
        }
      }

      this.getConversionKitCount()
      return material
    },

    // Calculate conversion kits
    getConversionKitCount () {
      const inputArr = this.eventRewardInputArr.map(obj => obj.value)
      const sel1 = (inputArr[61] === 'Gearbox Upgrade Kit 1' && inputArr[64] === 'Nitro Upgrade Kit 1') ? 1 : 0
      const sel2 = (inputArr[61] === 'Wheel Upgrade Kit 1' && inputArr[64] === 'Nitro Upgrade Kit 1') ? 2 : 0
      const sel3 = (inputArr[61] === 'Wheel Upgrade Kit 1' && inputArr[64] === 'ECU Upgrade Kit 1') ? 3 : 0
      const sel4 = (inputArr[61] === 'Gearbox Upgrade Kit 1' && inputArr[64] === 'ECU Upgrade Kit 1') ? 4 : 0

      let returnVal = 'N/A'
      if (sel1 === 1) returnVal = 'Engine, Turbo, Wheel & ECU Conversion Kits'
      else if (sel2 === 2) returnVal = 'Engine, Turbo, Gearbox & ECU Conversion Kits'
      else if (sel3 === 3) returnVal = 'Engine, Turbo, Gearbox & Nitro Conversion Kits'
      else if (sel4 === 4) returnVal = 'Engine, Turbo, Wheel & Nitro Conversion Kits'

      this.rewardKits = returnVal
      return returnVal
    }
  }
}
</script>

<style>

</style>
