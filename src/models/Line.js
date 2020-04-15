import {Chord} from "./Chord";

class Line {
  static createLine(notes){
    let newLine = []
    // {
    //   line: '',
    //   chords: []
    // }
    for (let note in notes) {
      let newChord = Chord.createChord(notes[note])
      newLine.push(newChord)
    }
    return newLine
  }
}

export {Line}