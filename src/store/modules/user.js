export default {
  namespaced: true,
  state: {
    userData: null // Stores the user data
  },
  getters: {
    getUserData: state => state.userData // Get user data
  },
  mutations: {
    setUserData (state, stat = null) { // Store logged in user data
      if (stat !== null && stat.constructor === Object) state.userData = stat
    }
  },
  actions: []
}
