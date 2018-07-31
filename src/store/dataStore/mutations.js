/*
export const someMutation = (state) => {
}
*/
export const sinInUser = (state, data) => {
  state.user = data
}
export const stateSpinner = (state, data) => {
  state.spinner.show = data
}
export const dataUser = (state, data) => {
  state.authUser = data
}
export const profileUserFromDb = (state, data) => {
  data.forEach(item => {
    for (let key in state.dataInputProfile) {
      if (item.id === key) {
        state.dataInputProfile[key] = item.data()
      }
    }
  })
}
export const switchLoadingInput = (state, boolean) => {
  state.loadingInput.loading = boolean
}
export const setGeoAddress = (state, data) => {
  state.dataInputProfile.location.value = data.data.results[0].formatted_address
}
