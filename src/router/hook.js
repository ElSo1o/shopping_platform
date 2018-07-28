import router from './index'
import firebase from 'firebase/app'

router.beforeEach((to, from, next) => {
  console.log('tr')
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      next('/auth')
    } else {
      next()
    }
  })
})
