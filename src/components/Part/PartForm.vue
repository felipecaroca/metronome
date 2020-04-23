<template>
  <v-container>
    <v-form v-model="partValid" @submit.prevent="addPart" ref="partForm">
      <v-row>
        <v-col>
          <v-text-field v-model="part.name"
                        label="Nombre de la Parte"
                        required
                        :rules="partNameRules"
                        @keyup.enter="addPart"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <chord-form :part="part"/>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <song-part-name-view :song="song" @click="setPart"/>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn :color="color"
                 @click="addPart"
          >
            <v-icon v-if="edit">mdi-floppy</v-icon>
            <v-icon v-if="!edit">mdi-plus</v-icon>
            {{edit? 'Guardar Parte': 'Agregar Parte'}}
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
  import {Part} from "../../models/Part"

  export default {
    props: ['song'],
    data: () => ({
      edit: false,
      part: new Part(),
      partValid: false,
      partNameRules: [
        v => !!v || 'Nombre de la parte es Requerido',
      ]
    }),
    methods: {
      setPart(part) {
        this.part = part
        this.edit = true
      },
      addPart() {
        if (this.$refs.partForm.validate()) {
          if (this.part.lines.length > 0) {
            if (this.edit) {
              this.edit = false
            } else {
              this.song.parts.push(this.part)
            }
            this.part = new Part()
            this.$refs.partForm.reset()

          } else
            this.$store.commit('openSnackBar', {
              message: 'la parte no tiene acordes',
              color: 'error'
            })
        }
      }
    },
    computed:{
      color(){
        return this.edit? 'primary' : 'info'
      }
    }
  }
</script>
