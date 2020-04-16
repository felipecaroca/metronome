import Vue from 'vue'
import Vuex from 'vuex'
import {Line} from '../models/Line'
import firebase from "firebase/app";
import router from "../router";
import {Compass} from "../models/Compass";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoading: false,
    user: {},
    dark: false,
    running: false,
    bpmCounter: 0,
    bpmTotal: 0,
    bpm: 500,
    interval: null,
    snackbarTime: null,
    snackbar: {
      visible: false,
      message: '',
      color: 'default'
    },
    songs: [],
    song: {
      parts: []
    },
    part: {
      name: '',
      lines: []
    },
    currentCompass: {
      tempo: 4,
      velocity: 120
    },
    compass: {
      tempo: 4,
      velocity: 120,
      current: 0,
      processCurrent: (compass) => {
        if (compass.current === compass.tempo)
          compass.current = 1
        else
          compass.current += 1
      }
    }
  },
  mutations: {
    setCurrentCompass(state, compass) {
      state.currentCompass.tempo = compass.tempo
      state.currentCompass.velocity = compass.velocity
    },
    setLoading(state, loading) {
      state.isLoading = loading
    },
    init(state) {
      Compass.init(state)
    },

    pause(state) {
      Compass.pause(state)
    },
    finish(state) {
      Compass.finish(state)
    },
    setCompass(state, compass) {
      for (let prop in compass) {
        state.compass[prop] = compass[prop]
      }
    },
    addLine(state, notes) {
      let newLine = new Line(notes)
      state.part.lines.push(newLine)
    },
    removeChord(state, data) {
      for (let line in state.part.lines) {
        if (data.arrayIndex === state.part.lines[line])
          state.part.lines[line].chords = state.part.lines[line].chords.filter(a => a !== data.note)
      }
    },
    addPart(state, partName) {
      let lines = []
      state.part.lines.forEach(line => {
        let newLine = Line.createLine(line.chords)
        lines.push(newLine)
      })
      let newPart = {
        name: partName,
        lines: lines
      }
      if (newPart.lines && newPart.lines.length > 0)
        state.song.parts.push(newPart)
    },
    resetPart(state) {
      state.part = {
        name: '',
        lines: []
      }
    },
    closeSnackBar(state) {
      state.snackbar.visible = false
      state.snackbar.message = ''
    },
    openSnackBar(state, data) {
      clearTimeout(state.snackbarTime)
      state.snackbar.visible = true
      state.snackbar.message = data.message
      if (data.color)
        state.snackbar.color = data.color
      state.snackbarTime = setTimeout(() => {
        state.snackbar.visible = false
      }, 5000)
    },
    logout(state) {
      firebase.auth().signOut().then(() => {
        state.user = {}
        router.push('/')
      })
    },
    setSongs(state, songs) {
      state.songs = songs
    },
    setSong(state, song) {
      state.compass.velocity = song.compass.velocity
      state.compass.tempo = song.compass.tempo
      state.compass.current = 0
      state.song = song
    },
    deleteSong(state, song){
      state.isLoading = true
      let deleteSong = firebase.functions().httpsCallable('deleteSong')

      deleteSong(song).then((res) => {
        console.log(res)
      }).catch(err => {
        console.log('error', err.details)
        clearTimeout(state.snackbarTime)
        state.snackbar.visible = true
        state.snackbar.message = err.message
        state.snackbar.color = 'error'
        state.snackbarTime = setTimeout(() => {
          state.snackbar.visible = false
        }, 5000)
      }).finally(() => state.isLoading = false)
    },
    saveSong(state) {
      state.isLoading = true
      let song = firebase.functions().httpsCallable('song')
      state.song.compass = state.compass
      song(state.song).then((res) => {
        console.log(res)
      }).catch(err => {
        console.log('error', err.details)
        clearTimeout(state.snackbarTime)
        state.snackbar.visible = true
        state.snackbar.message = err.message
        state.snackbar.color = 'error'
        state.snackbarTime = setTimeout(() => {
          state.snackbar.visible = false
        }, 5000)
      }).finally(() => state.isLoading = false)
    }
  },
  getters: {
    getPart(state) {
      return state.part
    },
    getCompass(state) {
      return state.compass
    },
    getRunning(state) {
      return state.running
    },
    getPartLines(state) {
      return state.part.lines
    },
    getSong(state) {
      return state.song
    },
    getBpmCounter(state) {
      return state.bpmCounter
    },
    getDark(state) {
      return state.dark
    },
    getSnackBar(state) {
      return state.snackbar
    },
    getUser: (state) => {
      firebase.auth().onAuthStateChanged(function (user) {
        if (user)
          state.user = user
      })
      return state.user
    },
    getLoading(state) {
      return state.isLoading
    },
    getSongs(state) {
      return state.songs
    },
    getCurrentCompass(state) {
      return state.currentCompass
    }
  },
  actions: {},
  modules: {}
})
