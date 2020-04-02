<template>
  <v-card
      class="d-flex flex-row mb-3"
      flat
      tile
  >
    <v-card v-for="note in notes" :key="note.$id" class="pa-3">
      {{note.name}}
      <v-btn color="error"
             x-small
             @click="removeChord(note, notes)"
      >X
      </v-btn>
    </v-card>
  </v-card>
</template>

<script>
  export default {
    name: "LineView",
    props:['notes'],
    methods:{
      removeChord(note, arrayIndex) {
        this.$emit('removeChord', note, arrayIndex)
      }
    }
  }
</script>
