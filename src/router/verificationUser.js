import firebaseApp from '../firebase'
import store from '../store'

const authUser = async (to, from, next) => {
  store.commit('dataStore/stateSpinner', true)
  await firebaseApp.auth().onAuthStateChanged((user) => {
    if (user) {
      if (to.name === 'MainSection') {
        next({name: 'AuthUser'})
      } else {
        store.dispatch('dataStore/checkUserFromFireStore', user)
        store.dispatch('dataStore/singInUser', user)
        next()
      }
    } else {
      if (to.name === 'MainSection') {
        next()
      } else {
        next({name: 'MainSection'})
      }
    }
    // store.commit('dataStore/stateSpinner', false)
  })
}
export default authUser
