import firebaseApp from '../../firebase'
import axios from 'axios'
import router from '../../router/index'
import {API_KEY} from '../../components/API_KEY'

const defaultTemplateUser = data => {
  return {
    name: data.displayName,
    email: data.email,
    phoneNumber: data.phoneNumber,
    photoURL: data.photoURL,
    profile: {
      welcome: [
        {
          active: true,
          complete: false,
          stepperNumber: 1
        },
        {
          active: false,
          complete: false,
          stepperNumber: 2
        },
        {
          active: false,
          complete: false,
          stepperNumber: 3
        }
      ],
      stepper: 1,
      info: null
    }
  }
}
export const singInUser = (state, user) => {
  state.commit('sinInUser', user)
}
export const checkUserFromFireStore = async (state, user) => {
  await firebaseApp.firestore().collection(`users`).doc(user.uid).get().then((querySnapshot) => {
    console.log(querySnapshot.data())
    firebaseApp.firestore().collection(`users`).doc(user.uid).collection('info').get().then((querySnapshots) => {
      state.commit('profileUserFromDb', querySnapshots.docs)
      // console.log(querySnapshots.docs[0].data())
    })
    if (typeof querySnapshot.data() === 'undefined') {
      state.dispatch('writeUserToFireStore', user)
    } else {
      state.commit('dataUser', querySnapshot.data())
    }
  }).catch((error) => {
    console.error(error)
  })
}
export const writeUserToFireStore = async (state, user) => {
  await firebaseApp.firestore().collection(`users`).doc(user.uid).set(defaultTemplateUser(user)).then(() => {
    state.commit('dataUser', defaultTemplateUser(user))
  }).catch((error) => {
    console.error('Error adding document: ', error)
  })
}
export const updateUserProfile = async (state, data) => {
  let dataShowWarning = {
    location: false,
    personal: false
  }
  if (typeof data.data.dataTable === 'undefined') {
    data.data.filled = true
    state.commit('updateIconMenu', {name: data.key, show: true})
  } else {
    if (data.data.dataTable.length === 0) {
      data.data.filled = false
      state.commit('updateIconMenu', {name: data.key, show: false})
    } else {
      data.data.filled = true
      state.commit('updateIconMenu', {name: data.key, show: true})
    }
  }
  for (let key in state.dataInputProfile) {
    if (key === 'location') {
      dataShowWarning.location = state.dataInputProfile[key].filled
    } else if (key === 'personal') {
      dataShowWarning.personal = state.dataInputProfile[key].filled
    }
  }
  // state.commit('showWarningProfile', dataShowWarning)
  console.log(data.data)
  await firebaseApp.firestore().collection(`users`).doc(data.uid).collection('info').doc(data.key).set(data.data).then(() => {
    console.log('Document successfully written!')
    state.commit('showSaveSuccess', {show: true, component: data.key})
    state.commit('switchLoadingInput', false)
  }).catch((error) => {
    console.error('Error adding document: ', error)
  })
}
export const getFullAddress = (state, data) => {
  axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${data.lat},${data.lng}&key=${API_KEY}`)
    .then((response) => {
      console.log(response)
      state.commit('setGeoAddress', response)
    })
    .catch((err) => {
      console.log(err)
    })
}
export const deleteProfile = async (state, user) => {
  await firebaseApp.firestore().collection(`users`).doc(user.uid).delete().then(() => {
    console.log('Document successfully deleted!')
    firebaseApp.auth().currentUser.delete().then(() => {
      state.dispatch('singInUser', {displayName: null})
      setTimeout(() => { router.push({name: 'MainSection'}) }, 0)
    }).catch(err => console.log(err))
  }).catch((error) => {
    console.error('Error removing document: ', error)
  })
}
