class Compass {
  constructor(compass = {}) {
    this.tempo = compass.tempo? compass.tempo : 4
    this.velocity = compass.velocity? compass.velocity : 120
    this.current = 0
  }

  isValid() {
    return this.tempo && this.velocity
  }

  processCurrent() {
    if (this.current === this.tempo)
      this.current = 1
    else
      this.current += 1
  }

  static init(song) {
    song.bpm = 60000 / song.compass.velocity
    song.interval = setInterval(() => {
      song.compass.processCurrent(song.compass)
      song.bpmCounter += 1
      if (song.bpmCounter === song.bpmTotal) {
        clearInterval(song.interval)
        song.running = false
        song.bpmCounter = 0
        song.compass.current = 0
      }
    }, song.bpm)
    song.running = true
  }

  static pause(song) {
    clearInterval(song.interval)
    song.running = false
  }

  static finish(song) {
    clearInterval(song.interval)
    song.running = false
    song.bpmCounter = 0
    song.compass.current = 0
  }
}

export {Compass}