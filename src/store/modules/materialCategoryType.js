import MaterialCategoryTypes from '@/config/MaterialCategoryTypes'

export default {
  namespaced: true,
  state: () => ({
    dataArr: MaterialCategoryTypes
  }),
  mutations: {

  },
  actions: {

  },
  getters: {
    getData: state => state.dataArr // Return material categories types data array
  }
}
