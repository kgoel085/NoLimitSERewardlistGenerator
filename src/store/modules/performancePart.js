import PerformanceParts from '@/config/PerformanceParts'

export default {
  namespaced: true,
  state: () => ({
    dataArr: PerformanceParts
  }),
  mutations: {

  },
  actions: {

  },
  getters: {
    getData: state => state.dataArr // Return performance parts data array
  }
}
