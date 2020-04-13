<template>
  <div>
    <v-form v-model="chordValid" ref="chordForm" @submit.prevent="addChord">
      <v-row>
        <v-col>
          <v-autocomplete :items="musicalNotes"
                          label="Acorde"
                          v-model="note.name"
                          required
                          :rules="nameRules"
          />
        </v-col>
        <v-col>
          <v-text-field v-model="note.duration" label="Duración del Acorde"
                        required
                        :rules="durationRules"
                        @keyup.enter="addChord"
          />
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
    </v-form>

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
  import {Chord} from "../../models/Chord";

  export default {
    data: () => ({
      musicalNotes: notes,
      chordValid: false,
      nameRules: [
        v => !!v || 'Acorde requerido'
      ],
      durationRules: [
        v => !!v || 'duración requerida'
      ],
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
        if (this.$refs.chordForm.validate()) {
          if (this.note.isValid(this.note)) {
            this.notes.push(Chord.createChord(this.note))
          } else {
            this.$store.commit('openSnackBar', {
              message: 'agregue los datos del formulario',
              color: 'error'
            })
          }
        }
      },
      removeStoredChord(data) {
        this.$store.commit('removeChord', data)
        this.$forceUpdate()
      },
      saveLine() {
        if (this.notes && this.notes.length > 0) {
          this.$store.commit('addLine', this.notes)
          this.notes = []
        } else
          this.$store.commit('openSnackBar', {
            message: 'la linea no tiene acordes',
            color: 'error'
          })
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
