import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';

import 'firebaseui/dist/firebaseui.css'


import firebase from "firebase/app";
import 'firebase/auth'
import 'firebase/functions'
import 'firebase/firestore'

import './imports/components'

Vue.config.productionTip = false

let firebaseConfig = {
  apiKey: "AIzaSyCvbqCGYSa5M_D82Ar6Yr-bMQRQ2ujtu94",
  authDomain: "visual-metronome.firebaseapp.com",
  databaseURL: "https://visual-metronome.firebaseio.com",
  projectId: "visual-metronome",
  storageBucket: "visual-metronome.appspot.com",
  messagingSenderId: "640577229539",
  appId: "1:640577229539:web:c1f5bd28eae174f3ffabd6",
  measurementId: "G-5856NW1ML0"
};
// // Initialize Firebase
firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged(function(){
  new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
  }).$mount('#app')
})




