class Compass {
  static init(state){
    state.bpm = 60000 / state.compass.velocity
    state.interval = setInterval(() => {
      state.compass.processCurrent(state.compass)
      state.bpmCounter += 1
      if (state.bpmCounter  === state.bpmTotal){
        clearInterval(state.interval)
        state.running = false
        state.bpmCounter = 0
        state.compass.current = 0
      }
      state.dark = !state.dark
    }, state.bpm)
    state.running = true
  }

  static pause(state){
    clearInterval(state.interval)
    state.running = false
  }
  static finish(state){
    clearInterval(state.interval)
    state.running = false
    state.bpmCounter = 0
    state.compass.current = 0
  }
}

export {Compass}