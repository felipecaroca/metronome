<template>
  <v-row class="text-center">
    <v-col>
      <v-btn color="success"
             class="ma-1"
             @click="playSequence"
             :disabled="isRunning"
             fab
      >
        <v-icon>mdi-play</v-icon>
      </v-btn>
      <v-btn color="info"
             @click="pauseSequence"
             class="ma-1"
             :disabled="!isRunning"
             fab
      >
        <v-icon>mdi-pause</v-icon>
      </v-btn>
      <v-btn color="error"
             @click="stopSequence"
             class="ma-1"
             :disabled="!isRunning"
             fab
      >
        <v-icon>mdi-stop</v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
  import {Compass} from "../../models/Compass";

  export default {
    props: ['song'],
    methods: {
      playSequence() {
        Compass.init(this.song)
      },
      pauseSequence() {
        Compass.pause(this.song)
      },
      stopSequence() {
        Compass.finish(this.song)
      }
    },
    computed: {
      isRunning() {
        return this.song && this.song.running
      }
    }
  }
</script>
