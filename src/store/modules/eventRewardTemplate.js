import EventRewardTemplate from '@/config/EventRewardTemplate'

export default {
  namespaced: true,
  state: () => ({
    dataArr: EventRewardTemplate
  }),
  mutations: {
    // Perform calculations for the reward list
    calculateRewardItems (state, stat) {
      const { day } = stat
      const findObj = state.dataArr.findIndex(obj => obj.day === day)
      if (parseInt(findObj) >= 0) state.dataArr.splice(findObj, 1, stat)
    },

    updateTplValue (state, stat) {
      const { index, day, value } = stat

      const mainArrIndex = state.dataArr.findIndex(obj => obj.day === day)
      if (mainArrIndex >= 0 && mainArrIndex !== null) {
        const findObj = state.dataArr[mainArrIndex].races.find((obj, key) => key === index)
        if (findObj) state.dataArr[mainArrIndex].races[index].value = value
      }
    }
  },
  actions: {

  },
  getters: {
    getData: state => state.dataArr,
    getInputData: state => {
      const returnVal = []
      state.dataArr.forEach(obj => {
        const { races } = obj
        returnVal.push(...races)
      })

      return returnVal
    } // Return event reward template data array
  }
}
