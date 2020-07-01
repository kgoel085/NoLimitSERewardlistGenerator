<template>
  <v-layout row wrap class="pa-1">
    <v-flex v-if="!eventRewardTpl">
      <v-alert>
        Loading...
      </v-alert>
    </v-flex>
    <v-flex v-else>
      <v-card v-for="(event, index) in eventRewardTpl" :key="index" class="ma-2">
        <v-card-title>Day {{ event.day }}</v-card-title>
        <v-card-text>
          <v-simple-table>
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
                <tr v-for="race in event.races" :key="race.id">
                  <td>{{race.id}}</td>
                  <td>{{ getName('category', race.category) }} - {{ getName('catType', race.category_type) }}</td>
                  <td>{{ getName('mType', race.material_type) }}</td>
                  <pre>
                    {{race}}
                  </pre>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          {{event.races}}
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'
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
      eventRewardTpl: 'EventRewardTemplate/getData' // Event reward Template Data
    })
  },
  methods: {
    // Get value for the frontend
    getName (section = null, val = null) {
      let returnVal = '-'
      let findArr
      switch (section) {
        // Material category
        case 'category':
          findArr = this.mCatData
          break

        // Material category type
        case 'catType':
          findArr = this.mCatTypeData
          break

        // Material type
        case 'mType':
          findArr = this.mTypeData
          break
      }

      if (findArr !== 'undefined' && findArr.constructor === Array) {
        const findObj = findArr.find(obj => obj.id === val)
        if (findObj !== null && Object.keys(findObj).length > 0) returnVal = findObj.name
      }

      return returnVal
    }
  }
}
</script>

<style>

</style>
