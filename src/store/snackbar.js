import {SnackBar} from "../models/SnackBar"

const snackBarModule = {
  state:{
    snackbarTime: null,
    snackbar: {
      visible: false,
      message: '',
      color: 'default'
    }
  },
  mutations:{
    openSnackBar(state, data) {
      SnackBar.openSnackBar(state, data)
    },
    closeSnackBar(state) {
      SnackBar.closeSnackBar(state)
    },
  },
  getters:{
    getSnackBar(state) {
      return state.snackbar
    },
  }
}

export {snackBarModule}