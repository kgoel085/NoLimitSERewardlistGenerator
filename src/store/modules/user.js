import fBase from './../../helpers/firebase'
import Store from './../../store'
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
      state.userData = stat
    }
  },
  actions: {
    // Sign user out
    signUserOut ({ state }, val = 'User logged out') {
      fBase.fireauth.signOut().then(resp => {
        Store.state.snackbar.info(val)
        Store.commit.setShowLoginModel(true)
        Store.commit.setShowLoginModel(false)
      }).catch(err => {
        Store.state.snackbar.error(err.message)
      })
    }
  }
}
