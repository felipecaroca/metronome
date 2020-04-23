<template>
  <v-card
      class="d-flex flex-row mb-3"
      flat
      tile
  >

    <v-card v-for="note in notes.chords"
            :key="note.$id"
            class="pa-3 ma-1"
            :dark="checkActive(note)"
            :color="checkColor(note)">
      {{note.name}}
      <v-spacer/>
      {{setCurrent(note)}}/{{note.duration}}
      <v-btn color="error"
             x-small
             @click="removeChord(note, notes)"
             v-if="deletable"
      >
        X
      </v-btn>
    </v-card>
  </v-card>
</template>

<script>
  export default {
    name: "LineView",
    props: ['notes', 'deletable', 'bpmCounter'],
    methods: {
      removeChord(note, arrayIndex) {
        this.$emit('removeChord', {note, arrayIndex})
      },
      checkActive(note) {
        return this.bpmCounter >= note.from && this.bpmCounter <= note.to && this.bpmCounter !== 0
      },
      setCurrent(note) {
        if (this.checkActive(note))
          return  this.bpmCounter - (note.from - 1)
        else if (this.bpmCounter > note.to)
          return  note.duration
        return 0
      },
      checkColor(note) {
        return this.checkActive(note) ? 'success' : ''
      }
    }
  }
</script>
