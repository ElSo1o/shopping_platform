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
        // console.log(state.dataInputProfile[key].dataTable)
        if (typeof state.dataInputProfile[key].dataTable === 'undefined') {
          state.dataInputProfile[key] = item.data()
        } else {
          state.dataInputProfile[key].dataTable = item.data().dataTable
        }
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
    if (itemMenu.component === nameComponent.name) {
      itemMenu.filled = nameComponent.show
    }
  })
}
export const addDataToTable = (state, data) => {
  console.log(data)
  for (let key in state.dataInputProfile) {
    if (key === data.key) {
      state.dataInputProfile[key].dataTable.unshift(data.value)
    }
  }
}
export const deleteDataTable = (state, info) => {
  for (let key in state.dataInputProfile) {
    if (key === info.key) {
      state.dataInputProfile[key].dataTable.splice(info.index, 1)
    }
  }
}
export const saveDataTable = (state, data) => {
  for (let key in state.dataInputProfile) {
    if (key === data.key) {
      state.dataInputProfile[key].dataTable.splice(data.index, 1)
      state.dataInputProfile[key].dataTable.unshift(data.value)
    }
  }
}
export const showRepeat = (state, data) => {
  state.showRepeat = data
}
export const showSaveSuccess = (state, data) => {
  state.itemsMenu.forEach(item => {
    if (item.component === data.component) {
      data.component = item.title
    }
  })
  state.successSaveData = data
}
export const showWarningProfile = (state, data) => {
  if (data.location && data.personal) {
    state.showWarningProfile.show = false
  } else {
    state.showWarningProfile.show = true
  }
}
