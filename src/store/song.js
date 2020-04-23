import {loadingModule} from "./loading"
import firebase from "firebase/app"
import {snackBarModule} from "./snackbar"

const songModule = {
  state:{
    songs: []
  },
  mutations:{
    setSongs(state, songs){
      state.songs = songs
    },
    saveSong(state, song) {
      loadingModule.mutations.setLoading(loadingModule.state, true)
      let saveSong = song.id ? firebase.functions().httpsCallable('updateSong') :
                                firebase.functions().httpsCallable('addSong')
      saveSong(song).then(() => {
        snackBarModule.mutations.openSnackBar(snackBarModule.state, {
          color: 'success',
          message: 'Guardado exitoso'
        })
      }).catch(err => {
        snackBarModule.mutations.openSnackBar(snackBarModule.state, {
          color: 'error',
          message: err.message
        })
      }).finally(() => loadingModule.mutations.setLoading(loadingModule.state, false))
    },
    deleteSong(state, song) {
      loadingModule.mutations.setLoading(loadingModule.state, true)
      let deleteSong = firebase.functions().httpsCallable('deleteSong')

      deleteSong(song).then(() => {
        snackBarModule.mutations.openSnackBar(snackBarModule.state,{
          color: 'success',
          message: 'Eliminado exitoso'
        })
      }).catch(err => {
        snackBarModule.mutations.openSnackBar(snackBarModule.state, {
          color: 'error',
          message: err.message
        })
      }).finally(() => loadingModule.mutations.setLoading(loadingModule.state, false))
    },
  },
  getters:{
    getSongs(state){
      return state.songs
    }
  }
}

export {songModule}