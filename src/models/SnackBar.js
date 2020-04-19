class SnackBar{
  static openSnackBar(state, data){
    clearTimeout(state.snackbarTime)
    state.snackbar.visible = true
    state.snackbar.message = data.message
    if (data.color)
      state.snackbar.color = data.color
    state.snackbarTime = setTimeout(() => {
      state.snackbar.visible = false
    }, 5000)
  }

  static closeSnackBar(state){
    state.snackbar.visible = false
    state.snackbar.message = ''
  }
}

export {SnackBar}