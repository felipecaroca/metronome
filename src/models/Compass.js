class Compass {
  constructor() {
    this.tempo = 4
    this.velocity = 120
    this.current = 0
  }
  // static init(song) {
  //   song.bpm = 60000 / song.compass.velocity
  //   song.interval = setInterval(() => {
  //     song.compass.processCurrent(song.compass)
  //     song.bpmCounter += 1
  //     if (song.bpmCounter === song.bpmTotal) {
  //       clearInterval(song.interval)
  //       song.running = false
  //       song.bpmCounter = 0
  //       song.compass.current = 0
  //     }
  //   }, song.bpm)
  //   song.running = true
  // }
  //
  // static pause(song) {
  //   clearInterval(song.interval)
  //   song.running = false
  // }
  //
  // static finish(song) {
  //   clearInterval(song.interval)
  //   song.running = false
  //   song.bpmCounter = 0
  //   song.compass.current = 0
  // }
}

export {Compass}