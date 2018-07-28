import firebase from 'firebase/app' // import the sdk
import 'firebase/auth'
import 'firebase/firestore'

// initialise your app

export default firebase.initializeApp({
  apiKey: 'AIzaSyC07ivK0tRiDJA8xoZGogjLmdHsHLZ5OGU',
  authDomain: 'msp4me-test.firebaseapp.com',
  databaseURL: 'https://msp4me-test.firebaseio.com',
  projectId: 'msp4me-test',
  storageBucket: 'msp4me-test.appspot.com',
  messagingSenderId: '585087806731'
})
const settings = {timestampsInSnapshots: true}
firebase.firestore().settings(settings)
