import Vue from 'vue'
import Vuex from 'vuex'
import dataStore from './dataStore'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    dataStore
  }
})

export default store
