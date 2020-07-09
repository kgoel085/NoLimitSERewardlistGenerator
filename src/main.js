import Vue from 'vue'
import App from './App.vue'
import store from './store'
import vuetify from './plugins/vuetify'
import firebase from './helpers/firebase' // Firebase
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import './assets/fonts.css'

Vue.config.productionTip = false

// On auth change set user data
firebase.fireauth.onAuthStateChanged((usr = null) => store.commit('User/setUserData', usr))

new Vue({
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
