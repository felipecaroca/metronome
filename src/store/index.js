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
      state.bpm = 60000 / state.compass.velocity
      state.interval = setInterval(() => {
        state.compass.processCurrent(state.compass)
        state.bpmCounter += 1
        console.log(state.bpmCounter, state.bpmTotal)
        if (state.bpmCounter  === state.bpmTotal){
          clearInterval(state.interval)
          state.running = false
        }

      }, state.bpm)
      state.running = true
    },
    calculateBpm(state){
      let durations = []
      let totalDurations = 0
      state.song.parts.forEach(part=>{
        part.lines.forEach(line=>{
          line.forEach((note) => {
            if (!isNaN(note.duration))
              note.from = totalDurations + 1
              totalDurations += parseFloat(note.duration)
              note.to = totalDurations
              durations.push(parseFloat(note.duration))
          })
        })
      })
      state.bpmTotal  = totalDurations
      console.log(durations)
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
      let newLine = []
      for (let note in notes) {
        newLine.push(notes[note])
      }
      state.part.lines.push(newLine)
    },
    removeChord(state,data) {
      for (let line in state.part.lines) {
        if (data.arrayIndex === state.part.lines[line])
          state.part.lines[line] = state.part.lines[line].filter(a => a !== data.note)
      }
    },
    addPart(state, partName){
      let newPart = {
        name: partName,
        lines: state.part.lines
      }
      if (newPart.lines && newPart.lines.length > 0)
        state.song.parts.push(newPart)
      else
        alert('la parte no tiene acordes')

    },
    resetPart(state){
      state.part = {
        name: '',
        lines: []
      }
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
    }
  },
  actions: {},
  modules: {}
})
