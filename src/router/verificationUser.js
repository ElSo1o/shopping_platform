import firebaseApp from '../firebase'
import store from '../store'

const authUser = (to, from, next) => {
  store.commit('dataStore/stateSpinner', true)
  firebaseApp.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log(user)
      let userId = user.uid
      firebaseApp.database().ref('/users/' + userId).once('value').then(function (snapshot) {
        let username = (snapshot.val() && snapshot.val().username) || 'Anonymous'
        console.log(username)
      })
      if (to.name === 'MainSection') {
        next({name: 'AuthUser'})
      } else {
        next()
        store.dispatch('dataStore/singInUser', user)
      }
    } else {
      if (to.name === 'MainSection') {
        next()
      } else {
        next({name: 'MainSection'})
      }
    }
    store.commit('dataStore/stateSpinner', false)
  })
}
export default authUser
