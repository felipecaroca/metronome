import firebase from "firebase/app"
import router from "../router"

const authModule = {
  state:{
    user: {},
  },
  mutations:{
    logout(state) {
      firebase.auth().signOut().then(() => {
        state.user = {}
        router.push('/')
      })
    },
  },
  getters:{
    getUser: (state) => {
      firebase.auth().onAuthStateChanged(function (user) {
        if (user)
          state.user = user
      })
      return state.user
    },
  }
}

export {authModule}