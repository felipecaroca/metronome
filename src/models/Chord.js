class Chord {
  static createChord(data){
    return {
      name: data.name,
      duration: data.duration
    }
  }
}

export {Chord}