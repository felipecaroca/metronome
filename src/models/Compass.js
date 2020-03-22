class Compass {
  constructor(tempo, velocity) {
    this.tempo = tempo
    this.velocity = velocity
  }

  get bpm(){
    return 60000 / this.velocity
  }
}