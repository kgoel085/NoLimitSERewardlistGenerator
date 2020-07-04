import Vue from 'vue'
import Vuex from 'vuex'
import Modules from './modules' // Custom modules

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isDark: true,
    showLoginModel: false
  },
  getters: {
    isDarkMode: state => state.isDark, // Get dark mode
    showLoginModel: state => state.showLoginModel // Whether to show login model or not
  },
  mutations: {
    // Set the dark mode
    setDarkMode (state, stat = false) {
      state.isDark = stat
    },
    // Set login model stat
    setShowLoginModel (state, stat = false) {
      state.showLoginModel = stat
    }
  },
  actions: {
  },
  modules: { ...Modules }
})
