/*
export const someMutation = (state) => {
}
*/
export const sinInUser = (state, data) => {
  // state.user = Object.assign({}, data)
  state.user = data
}
export const stateSpinner = (state, data) => {
  // state.user = Object.assign({}, data)
  state.spinner.show = data
}
export const dataUser = (state, data) => {
  // state.user = Object.assign({}, data)
  state.authUser = data
}
// export const toggleSuccessNotifyLogin = (state, data) => {
//   state.successNotify = data
// }
