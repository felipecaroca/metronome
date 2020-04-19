import {loadingModule} from "./loading"
import firebase from "firebase/app"
import {snackBarModule} from "./snackbar"

const songModule = {
  state:{
    song: {},
    songs: []
  },
  mutations:{
    setSong(state, song){
      state.song = song
    },
    setSongs(state, songs){
      state.songs = songs
    },
    saveSong(state, song) {
      loadingModule.mutations.setLoading(loadingModule.state, true)
      let saveSong = firebase.functions().httpsCallable('song')
      saveSong(song).then((res) => {
        console.log(res)
      }).catch(err => {
        console.log('error', err.details)

        snackBarModule.mutations.openSnackBar(snackBarModule.state, {
          color: 'error',
          message: err.message
        })
      }).finally(() => loadingModule.mutations.setLoading(loadingModule.state, false))
    },
    deleteSong(state, song) {
      loadingModule.mutations.setLoading(loadingModule.state, true)
      let deleteSong = firebase.functions().httpsCallable('deleteSong')

      deleteSong(song).then((res) => {
        console.log(res)
      }).catch(err => {
        console.log('error', err.details)
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