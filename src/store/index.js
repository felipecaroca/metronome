import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    running: false,
    bpmCounter: 0,
    bpmTotal: 0,
    bpm: 500,
    currentTempo: 0,
    interval: null,
    part:{
      name:'',
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
      state.bpm = 60000 / state.compass.velocity
      state.interval = setInterval(() => {
        state.compass.processCurrent(state.compass)
      }, state.bpm)
      state.running = true
    },
    finish(state) {
      clearInterval(state.interval)
      state.running = false
    },
    setCompass(state, compass) {
      for (let prop in compass) {
        state.compass[prop] = compass[prop]
      }
    },
    addLine(state, notes) {
      state.part.lines.push(notes)
    }
  },
  getters: {
    getCompass(state) {
      return state.compass
    },
    getRunning(state) {
      return state.running
    }
  },
  actions: {},
  modules: {}
})
