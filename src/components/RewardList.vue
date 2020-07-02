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
          </tbody>
        </template>
      </v-simple-table>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data: () => ({}),
  computed: {
    ...mapGetters({
      mData: 'Material/getData', // Material Data
      eventRewardInputArr: 'EventRewardTemplate/getInputData' // Event reward Template Data
    }),
    rewardListArr () {
      const returnVal = []
      for (const material of this.mData) {
        const finalObj = this.getActualRewardCount(material)
        returnVal.push(finalObj)
      }

      return returnVal
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
          break
        }

        case 'Thrust Sleeve': {
          if (selArr[0] === 'Thrust Sleeve') material.subtract = 4
          else if (selArr[0] === 'Flywheel') material.subtract = 6
          break
        }

        case 'Input Shaft': {
          if (selArr[1] === 'Input Shaft' || selArr[1] === 'Tread') material.subtract = 5
          break
        }

        case 'Tread': {
          if (selArr[1] === 'Input Shaft' || selArr[1] === 'Tread') material.subtract = 5
          break
        }

        case 'Thermosensor': {
          if (selArr[4] === 'Thermosensor') material.subtract = 7
          else if (selArr[4] === 'Valve') material.subtract = 5
          break
        }

        case 'Valve': {
          if (selArr[4] === 'Valve') material.subtract = 7
          else if (selArr[4] === 'Thermosensor') material.subtract = 5
          break
        }

        case 'Intake': {
          if (selArr[9] === 'Intake') material.subtract = 2
          else if (selArr[9] === 'Backplate') material.subtract = 6
          break
        }

        case 'Backplate': {
          if (selArr[9] === 'Backplate') material.subtract = 2
          else if (selArr[9] === 'Intake') material.subtract = 6
          break
        }

        case 'Clutch Plate': {
          if (selArr[16] === 'Clutch Plate') material.subtract = 5
          else if (selArr[16] === 'Brake Disc') material.subtract = 4
          break
        }

        case 'Brake Disc': {
          if (selArr[16] === 'Brake Disc') material.subtract = 5
          else if (selArr[16] === 'Clutch Plate') material.subtract = 4
          break
        }

        case 'Harness': {
          if (selArr[12] === 'Harness') material.subtract = 5
          else if (selArr[12] === 'Tank') material.subtract = 4
          break
        }

        case 'Tank': {
          if (selArr[12] === 'Tank') material.subtract = 5
          else if (selArr[12] === 'Harness') material.subtract = 4
          break
        }
      }

      return material
    }
  }
}
</script>

<style>

</style>
