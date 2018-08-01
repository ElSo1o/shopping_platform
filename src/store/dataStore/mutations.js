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
  data.forEach((item, i) => {
    for (let key in state.dataInputProfile) {
      if (item.id === key) {
        console.log(state.dataInputProfile[key])
        state.dataInputProfile[key] = item.data()
      }
    }
    state.itemsMenu.forEach(itemMenu => {
      if (item.id === itemMenu.component) {
        itemMenu.filled = item.data().filled
      }
    })
  })
}
export const switchLoadingInput = (state, boolean) => {
  state.loadingInput.loading = boolean
}
export const setGeoAddress = (state, data) => {
  state.dataInputProfile.location.value = data.data.results[0].formatted_address
}
export const updateIconMenu = (state, nameComponent) => {
  state.itemsMenu.forEach(itemMenu => {
    if (itemMenu.component === nameComponent) {
      itemMenu.filled = true
    }
  })
}
