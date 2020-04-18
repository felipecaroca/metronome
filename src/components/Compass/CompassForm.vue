<template>
  <v-row class="text-center" align="center">
    <v-col class="mb-5"
           cols="6"
    >
      <h2 class="headline font-weight-bold mb-3">
        Compás
      </h2>

      <v-row justify="center">
        <v-text-field v-model="compass.tempo"
                      label="Tiempos"
                      :disabled="isRunning"
        />
      </v-row>
      <v-row>
        <v-text-field v-model="compass.velocity"
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
  import {Compass} from "../../models/Compass"

  export default {
    data: () => ({
      compass: new Compass()
    }),
    watch: {
      tempo: function () {
        this.$emit('compass', this.compass)

      },
      velocity: function () {
        this.$emit('compass', this.compass)
      }
    },
    computed: {
      tempo() {
        return this.compass.tempo
      },
      velocity() {
        return this.compass.velocity
      }
    }
  }
</script>