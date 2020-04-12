import Vue from 'vue'
import Vuex from 'vuex'
import {Line} from '../models/Line'
import firebase from "firebase/app";
import router from "../router";
import {Compass} from "../models/Compass";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    dark: false,
    running: false,
    bpmCounter: 0,
    bpmTotal: 0,
    bpm: 500,
    interval: null,
    snackbarTime: null,
    snackbar:{
      visible: false,
      message: ''
    },
    song:{
      parts: []
    },
    part: {
      name: '',
      lines: []
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
    init(state) {
     Compass.init(state)
    },
    calculateBpm(state){
      let durations = []
      let totalDurations = 0
      state.song.parts.forEach(part=>{
        part.from = totalDurations + 1
        part.lines.forEach(line=>{
          line.forEach((note) => {
            if (!isNaN(note.duration))
              note.from = totalDurations + 1
              totalDurations += parseFloat(note.duration)
              note.to = totalDurations
              durations.push(parseFloat(note.duration))
          })
          part.to = totalDurations
        })
      })
      state.bpmTotal  = totalDurations
    },
    pause(state) {
     Compass.pause(state)
    },
    finish(state){
     Compass.finish(state)
    },
    setCompass(state, compass) {
      for (let prop in compass) {
        state.compass[prop] = compass[prop]
      }
    },
    addLine(state, notes) {
      let newLine = Line.createLine(notes)
      state.part.lines.push(newLine)
    },
    removeChord(state,data) {
      for (let line in state.part.lines) {
        if (data.arrayIndex === state.part.lines[line])
          state.part.lines[line] = state.part.lines[line].filter(a => a !== data.note)
      }
    },
    addPart(state, partName){
      let lines = []
      state.part.lines.forEach(line=>{
        let newLine = Line.createLine(line)
        lines.push(newLine)
      })
      let newPart = {
        name: partName,
        lines: lines
      }
      if (newPart.lines && newPart.lines.length > 0)
        state.song.parts.push(newPart)
    },
    resetPart(state){
      state.part = {
        name: '',
        lines: []
      }
    },
    closeSnackBar(state){
      state.snackbar.visible = false
      state.snackbar.message = ''
    },
    openSnackBar(state, message){
      clearTimeout(state.snackbarTime)
      state.snackbar.visible = true
      state.snackbar.message = message
      state.snackbarTime = setTimeout(()=>{
        state.snackbar.visible = false
      }, 5000)
    },
    logout(state){
      firebase.auth().signOut().then(()=> {
        state.user = {}
        router.push('/')
      })
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
    getSong(state){
      return state.song
    },
    getBpmCounter(state){
      return state.bpmCounter
    },
    getDark(state){
      return state.dark
    },
    getSnackBar(state){
      return state.snackbar
    },
    getUser:(state)=>{
      firebase.auth().onAuthStateChanged(function(user){
        state.user = user
      })
      return state.user
    }
  },
  actions: {},
  modules: {}
})
