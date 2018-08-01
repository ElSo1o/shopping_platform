import firebase from 'firebase/app' // import the sdk
import 'firebase/auth'
import 'firebase/firestore'

// initialise your app

export default firebase.initializeApp({
  apiKey: 'AIzaSyCxBuL2rOVJA3QsALRfG7LwlATVXaZFiXE',
  authDomain: 'msp4-test.firebaseapp.com',
  databaseURL: 'https://msp4-test.firebaseio.com',
  projectId: 'msp4-test',
  storageBucket: 'msp4-test.appspot.com',
  messagingSenderId: '957335132314'
})
const settings = {timestampsInSnapshots: true}
firebase.firestore().settings(settings)
