import {Compass} from "./Compass"
import {Part} from "./Part";
import {Chord} from "./Chord";
import {Line} from "./Line";

class Song{
  constructor(song = {}) {
    this.name = song.name? song.name : ''
    this.interval = null
    this.parts = []

    if (song.parts && song.parts.length > 0){
      song.parts.forEach(part=>{
        let lines = []
        part.lines.forEach(line=>{
          let chords = []
          line.chords.forEach(chord=>{
            let tmp = new  Chord(chord.name, chord.duration)
            chords.push(tmp)
          })
          lines.push(new Line(chords))
        })
        this.parts.push(new Part(part.name, lines))
      })
    }

    this.bpmTotal = song.bpmTotal
    this.bpmCounter = 0
    this.running = false
    this.compass = new Compass(song.compass)

    this.calculateBpm()
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