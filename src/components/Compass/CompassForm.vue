<template>
  <v-row class="text-center" align="center">
    <v-col class="mb-5"
           cols="6"
    >
      <h2 class="headline font-weight-bold mb-3">
        Compás
      </h2>

      <v-row justify="center">
        <v-text-field v-model="newCompass.tempo"
                      label="Tiempos"
                      :disabled="isRunning"
        />
      </v-row>
      <v-row>
        <v-text-field v-model="newCompass.velocity"
                      label="Bpm"
                      :disabled="isRunning"
        />
      </v-row>
    </v-col>
    <v-col class="mb-5 display-3"
           cols="6"

    >
      <h1>{{newCompass.current}}</h1>

    </v-col>
  </v-row>
</template>

<script>
  import {Compass} from "../../models/Compass"

  export default {
    props: ['compass', 'isRunning'],
    data: () => ({
      newCompass: new Compass()
    }),
   created() {
      if (this.compass)
        this.newCompass = this.compass
   }
  }
</script>