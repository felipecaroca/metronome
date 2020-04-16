import {Compass} from "./Compass"

class Song{
  constructor(parts = []) {
    this.name = ''
    this.interval = null
    this.parts = parts
    this.bpmTotal = 0
    this.compass = new Compass()
    this.from = null
    this.to = null
  }

  calculateBpm() {
    let totalDurations = 0
    this.parts.forEach(part => {
      part.from = totalDurations + 1
      part.lines.forEach(line => {
        line.chords.forEach((note) => {
          if (!isNaN(note.duration))
            note.from = totalDurations + 1
          totalDurations += parseFloat(note.duration)
          note.to = totalDurations
        })
        part.to = totalDurations
      })
    })

    this.bpmTotal = totalDurations
  }
}

export {Song}