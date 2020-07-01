import MaterialCategories from '@/config/MaterialCategory'

export default {
  namespaced: true,
  state: () => ({
    dataArr: MaterialCategories
  }),
  mutations: {

  },
  actions: {

  },
  getters: {
    getData: state => state.dataArr // Return material categories data array
  }
}
