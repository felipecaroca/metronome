<template>
  <v-container>
    <v-row>
      <v-col cols="3">
        <compass :compass="song.compass" :isRunning="song.running" v-if="song" />
        <compass-player :song="song" v-if="song" />
      </v-col>
      <v-col cols="9">
        <p class="display-1">{{song? song.name : 'Selecciona una cación'}}</p>
        <song-part-view :song="song" v-if="song" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

  export default {
    computed: {
      song() {
        return this.$route.params.song ? this.$route.params.song : null
      }
    }
  }
</script>
