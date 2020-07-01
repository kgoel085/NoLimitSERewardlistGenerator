import MaterialTypes from '@/config/MaterialType'

export default {
  namespaced: true,
  state: () => ({
    dataArr: MaterialTypes
  }),
  mutations: {

  },
  actions: {

  },
  getters: {
    getData: state => state.dataArr // Return material type data array
  }
}
