import Materials from '@/config/Materials'

export default {
  namespaced: true,
  state: () => ({
    dataArr: Materials
  }),
  mutations: {

  },
  actions: {

  },
  getters: {
    getData: state => state.dataArr // Return material data array
  }
}
