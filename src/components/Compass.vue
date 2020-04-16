<template>
  <v-row class="text-center" align="center">
    <v-col class="mb-5"
           cols="6"
    >
      <h2 class="headline font-weight-bold mb-3">
        Compás
      </h2>

      <v-row justify="center">
        <v-text-field v-model="tempo"
                      label="Tiempos"
                      :disabled="isRunning"
        />
      </v-row>
      <v-row>
        <v-text-field v-model="velocity"
                      label="Bpm"
                      :disabled="isRunning"
        />
      </v-row>
    </v-col>
    <v-col class="mb-5 display-3"
           cols="6"

    >
      <h1>{{compass.current}}</h1>

    </v-col>
  </v-row>
</template>

<script>
  export default {
    data: () => ({
      tempo: 4,
      velocity: 120,
      storedTempo: null,
      storedVelocity: null
    }),
    created() {
      this.storedTempo = this.currentCompassTempo
      this.storedVelocity = this.currentCompassVelocity
    },
    watch: {
      storedTempo: function () {
        this.tempo = this.currentCompassTempo

      },
      storedVelocity: function(){
        this.velocity = this.currentCompassVelocity
      },
      tempo: function (val) {
        this.$store.commit('setCompass', {
          tempo: parseInt(val),
          current: 0
        })
      },
      velocity: function (val) {
        this.$store.commit('setCompass', {
          velocity: parseInt(val),
          current: 0
        })
      }
    },
    computed: {
      compass() {
        return this.$store.getters.getCompass
      },
      isRunning() {
        return this.$store.getters.getRunning
      },
      currentCompass() {
        return this.$store.getters.getCurrentCompass
      },
      currentCompassTempo(){
        return this.currentCompass.tempo
      },
      currentCompassVelocity(){
        return this.currentCompass.velocity
      }
    }
  }
</script>