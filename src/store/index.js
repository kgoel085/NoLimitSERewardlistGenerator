import Vue from 'vue'
import Vuex from 'vuex'
import Modules from './modules' // Custom modules

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isDark: true
  },
  getters: {
    isDarkMode: state => state.isDark // Get dark mode
  },
  mutations: {
    // Set the dark mode
    setDarkMode (state, stat) {
      state.isDark = stat
    }
  },
  actions: {
  },
  modules: { ...Modules }
})
