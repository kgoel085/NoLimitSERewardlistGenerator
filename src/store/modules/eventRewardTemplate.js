import EventRewardTemplate from '@/config/EventRewardTemplate'

export default {
  namespaced: true,
  state: () => ({
    dataArr: EventRewardTemplate
  }),
  mutations: {

  },
  actions: {

  },
  getters: {
    getData: state => state.dataArr // Return event reward template data array
  }
}
