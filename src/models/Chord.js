class Chord {
  // static createChord(data){
  //   return {
  //     name: data.name,
  //     duration: data.duration
  //   }
  // }
  constructor(name, duration) {
    this.name = name
    this.duration = duration
    this.from = null
    this.to = null

  }
}

export {Chord}