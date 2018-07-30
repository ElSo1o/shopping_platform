import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import dataStore from './store/dataStore'
// import firebaseApp from './firebase'

import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import colors from 'vuetify/es5/util/colors'

// const db = firebaseApp.database()
Vue.use(Vuetify, {
  theme: {
    primary: colors.blue.lighten2,
    secondary: colors.green.lighten1
  }
})
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    dataStore
  }
})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
