import firebaseApp from '../../firebase'
const defaultTemplateUser = data => {
  return {
    name: data.displayName,
    email: data.email,
    phoneNumber: data.phoneNumber,
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
      stepper: 1
    }
  }
}
export const singInUser = (state, user) => {
  state.commit('sinInUser', user)
  // console.log(state)
  // console.log(user)
}
export const checkUserFromFireStore = (state, user) => {
  firebaseApp.firestore().collection(`users`).doc(user.uid).get().then((querySnapshot) => {
    if (typeof querySnapshot.data() === 'undefined') {
      state.dispatch('writeUserToFireStore', user)
    } else {
      state.commit('dataUser', querySnapshot.data())
    }
  }).catch((error) => {
    console.error(error)
  })
}
export const writeUserToFireStore = (state, user) => {
  firebaseApp.firestore().collection(`users`).doc(user.uid).set(defaultTemplateUser(user)).then((result) => {
    // console.log(result)
    state.commit('dataUser', defaultTemplateUser(user))
  }).catch((error) => {
    console.error('Error adding document: ', error)
  })
}
