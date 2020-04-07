<template>
  <div>
    <v-row>
      <v-col>
        <v-autocomplete :items="musicalNotes"
                        label="Acorde"
                        v-model="note.name"/>
      </v-col>
      <v-col>
        <v-text-field v-model="note.duration" label="Duración del Acorde"/>
      </v-col>
      <v-col>
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
      </v-col>
      <v-col>
        <part-line-view :notes="storedNotes" v-for="storedNotes in storedLines"
                        @removeChord="removeStoredChord"
                        :key="storedNotes.$id"
                        :deletable="true"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <part-line-view :notes="notes"
                        @removeChord="removeChord"
                        :deletable="true"
        />

      </v-col>
    </v-row>
  </div>
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
      removeStoredChord(data) {
        this.$store.commit('removeChord', data)
        this.$forceUpdate()
      },
      saveLine() {
        this.$store.commit('addLine', this.notes)
        this.notes = []
      },
      removeChord(data) {
        this.notes = this.notes.filter(a => a !== data.note)
      }
    },
    computed: {
      storedLines() {
        return this.$store.getters.getPartLines
      }
    }
  }
</script>
