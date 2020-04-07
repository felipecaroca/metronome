import {Chord} from "./Chord";

class Line {
  static createLine(notes){
    let newLine = []
    for (let note in notes) {
      console.log(note)
      let newChord = Chord.createChord(notes[note])
      newLine.push(newChord)
    }
    return newLine
  }
}

export {Line}