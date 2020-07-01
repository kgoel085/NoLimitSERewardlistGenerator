import Vue from 'vue'
import Vuex from 'vuex'
import Modules from './modules' // Custom modules

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: { ...Modules }
})
