<template>
  <v-card
      class="d-flex flex-row mb-3"
      flat
      tile
  >
    <v-card class="pa-3">
      <v-autocomplete :items="musicalNotes"
                      label="Acorde"

                      v-model="note.name"/>
      <v-text-field v-model="note.duration" label="Duración del Acorde"/>
      <v-btn fab
             small
             @click="addChord"
             class="ma-1"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <v-btn fab
             small
             color="success"
             class="ma-1"
             @click="saveLine"
      >
        <v-icon>mdi-floppy</v-icon>
      </v-btn>
    </v-card>
    <part-line-view :notes="notes"/>
  </v-card>
</template>

<script>
  import {notes} from "../../imports/musialNotes";

  export default {
    data: () => ({
      musicalNotes: notes,
      note: {
        name: '',
        duration: null,
        isValid: (note) => {
          return note.name && note.duration && !isNaN(note.duration)
        }
      },
      notes: []
    }),
    methods: {
      addChord() {
        if (this.note.isValid(this.note)) {
          this.notes.push({
            'name': this.note.name,
            'duration': this.note.duration
          })
        } else {
          alert('agregue los datos del formulario')
        }
      },
      saveLine() {
        this.$store.commit('addLine', this.notes)
      }
    }
  }
</script>
