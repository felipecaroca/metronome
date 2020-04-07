<template>
  <v-container>
    <v-row>
      <v-col cols="2">
        <compass/>
        <v-row class="text-center">
          <v-col cols="6" class="text-right">
            <v-btn color="success"
                   @click="playSequence"
                   :disabled="isRunning"
                   fab
            >
              <v-icon>mdi-play</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="6">
            <v-btn color="info"
                   @click="stopSequence"
                   :disabled="!isRunning"
                   fab
            >
              <v-icon>mdi-pause</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="10">
        <song-form />
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
