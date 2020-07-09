import Vue from 'vue'
import Vuex from 'vuex'
import Modules from './modules' // Custom modules
import Vuetify from './../plugins/vuetify'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isDark: true,
    showLoginModel: false,
    snackbar: null
  },
  getters: {
    isDarkMode: state => state.isDark, // Get dark mode
    showLoginModel: state => state.showLoginModel, // Whether to show login model or not
    getSnackBar: state => state.snackbar // Returns the snackbar object
  },
  mutations: {
    // Set the dark mode
    setDarkMode (state, stat = false) {
      state.isDark = stat
      Vuetify.framework.theme.dark = state.isDark
    },
    // Set login model stat
    setShowLoginModel (state, stat = false) {
      state.showLoginModel = stat
    },
    // Store snack bar
    setSnackBarObj (state, stat) {
      state.snackbar = stat
    }
  },
  actions: {},
  modules: { ...Modules }
})
