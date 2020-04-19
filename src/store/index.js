import Vue from 'vue'
import Vuex from 'vuex'
import {songModule} from "./song"
import {snackBarModule} from "./snackbar"
import {loadingModule} from "./loading"
import {authModule} from "./auth"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  getters: {

  },
  actions: {},
  modules: {
    songModule,
    snackBarModule,
    loadingModule,
    authModule
  }
})
