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
          <chord-form :part="part" />

        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <song-part-name-view :song="song" @click="setPart"/>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn color="primary"
                 @click="addPart"
          >
            <v-icon>mdi-floppy</v-icon>
            Guardar Parte
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
  import {Part} from "../../models/Part";

  export default {
    props: ['song'],
    data: () => ({
      part: new Part(),
      partValid: false,
      partNameRules: [
        v => !!v || 'Nombre de la parte es Requerido',
      ]
    }),
    methods: {
      setPart(part){
        console.log('implementar esta parte', part)
      },
      addPart() {
        if (this.$refs.partForm.validate()){
          if (this.part.lines.length > 0) {
            this.song.parts.push(this.part)
            this.part = new Part()
          }
          else
            this.$store.commit('openSnackBar', {
              message: 'la parte no tiene acordes',
              color: 'error'
            })
        }
      }
    }
  }
</script>
