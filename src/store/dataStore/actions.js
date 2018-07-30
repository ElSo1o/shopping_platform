import firebaseApp from '../../firebase'
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
  console.log(data)
  await firebaseApp.firestore().collection(`users`).doc(data.uid).collection('info').doc('personal').set(data.data).then(() => {
    console.log('Document successfully written!')
    state.commit('switchLoadingInput', false)
  }).catch((error) => {
    console.error('Error adding document: ', error)
  })
}
