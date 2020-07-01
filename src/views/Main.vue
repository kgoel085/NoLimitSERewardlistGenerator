<template>
  <v-layout row wrap>
    <p>Test Page</p>
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
      mCatTypeData: 'MaterialCategory/getData', // Material Category Data
      perfPartData: 'PerformancePart/getData', // Performance Parts Data
      eventRewardTpl: 'EventRewardTemplate/getData' // Event reward Template Data
    })
  }
}
</script>

<style>

</style>
