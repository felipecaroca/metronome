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
          <v-btn @click="addChord"
                 class="ma-1"
          >
            <v-icon>mdi-plus</v-icon>
            Agregar Acorde
          </v-btn>
          <v-btn color="success"
                 class="ma-1"
                 @click="saveLine"
                 v-if="notes.length > 0"
          >
            <v-icon>mdi-floppy</v-icon>
            Agregar Línea
          </v-btn>
        </v-col>
        <v-col>
          <v-card v-if="storedLines && storedLines.length > 0" class="elevation-6">
            <v-card-title>
              Acordes de la Parte
            </v-card-title>
            <v-card-text>
              <part-line-view :notes="storedNotes" v-for="storedNotes in storedLines"
                              @removeChord="removeStoredChord"
                              :key="storedNotes.$id"
                              :deletable="true"
              />
            </v-card-text>
          </v-card>

        </v-col>
      </v-row>
    </v-form>

    <v-row>
      <v-col>

        <part-line-view :notes="line"
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
  import {Line} from "../../models/Line";

  export default {
    props:['part'],
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
            this.notes.push(new Chord(this.note.name, this.note.duration))

          } else {
            this.$store.commit('openSnackBar', {
              message: 'agregue los datos del formulario',
              color: 'error'
            })
          }
        }
      },
      removeStoredChord(data) {
        this.part.lines.forEach(line=>{
          if (line.__ob__.dep.id === data.arrayIndex.__ob__.dep.id){
            line.chords = line.chords.filter(a=> a !== data.note)
          }
        })
        this.part.lines = this.part.lines.filter(a=>a.chords.length > 0)
      },
      saveLine() {
        if (this.notes && this.notes.length > 0) {
          this.part.lines.push(new Line(this.notes))
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
        return this.part.lines
      },
      line(){
        return {
          chords: this.notes
        }
      }
    }
  }
</script>
