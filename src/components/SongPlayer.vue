<template>
  <v-container>
    <v-row>
      <v-col cols="2">
        <compass/>
        <v-row class="text-center">
          <v-col cols="4" class="text-right">
            <v-btn color="success"
                   @click="playSequence"
                   :disabled="isRunning"
                   fab
            >
              <v-icon>mdi-play</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="4">
            <v-btn color="info"
                   @click="pauseSequence"
                   :disabled="!isRunning"
                   fab
            >
              <v-icon>mdi-pause</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="4">
            <v-btn color="error"
                   @click="stopSequence"
                   :disabled="!isRunning"
                   fab
            >
              <v-icon>mdi-stop</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="10">
        <p class="display-1">{{song.name}}</p>
        <song-part-view />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

  export default {
    methods: {
      playSequence() {
        this.$store.commit('init')
      },
      pauseSequence(){
        this.$store.commit('pause')
      },
      stopSequence() {
        this.$store.commit('finish')
      }
    },
    computed: {
      isRunning() {
        return this.$store.getters.getRunning
      },
      song() {
        return this.$store.getters.getSong
      }
    }

  }
</script>
