<template>
  <div>
    <v-form v-model="songValid" ref="songForm" @submit.prevent="saveSong">
      <v-row>
        <v-col cols="3">
          <compass :compass="song.compass" :isRunning="song.running"/>
          <compass-player :song="song"/>
        </v-col>
        <v-col>
          <v-text-field v-model="song.name"
                        label="Nombre de la Canción"
                        required
                        :rules="nameRules"
          />
          <v-btn color="success"
                 @click="saveSong"
                 v-if="user.uid"
          >
            <v-icon>mdi-floppy</v-icon>
            Guardar
          </v-btn>
          <v-dialog
              v-model="partDialog"
              fullscreen hide-overlay
              transition="dialog-bottom-transition"
              :persistent="true"

          >
            <template v-slot:activator="{ on }">

              <v-btn
                  color="info"
                  dark
                  v-on="on"
                  class="ma-1"
              >
                <v-icon>mdi-plus</v-icon>
                Agregar Parte
              </v-btn>
            </template>

            <v-card>
              <v-toolbar dark color="primary">
                <v-btn icon dark @click="closeDialog">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>Parte de la Canción</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <part-form :song="song"/>
              </v-card-text>
            </v-card>
          </v-dialog>
          <song-part-view :song="song"/>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script>
  import {Song} from "../../models/Song"

  export default {
    data: () => ({
      song: new Song(),
      partDialog: false,
      songValid: false,
      nameRules: [
        v => !!v || 'Nombre de la canción es Requerido',
      ],
    }),
    methods: {
      saveSong() {
        if (this.$refs.songForm.validate()) {
          if (this.song.parts.length === 0)
            this.$store.commit('openSnackBar', {
              message: 'Debe agregar partes a la canción presionando el botón AGREGAR PARTE',
              color: 'error'
            })
          else {
            this.song.calculateBpm()
            if (!this.user.uid){
              this.$router.push({name: 'login'})
            }
            else
              this.$store.commit('saveSong', this.song)
          }
        }
      },
      closeDialog() {
        this.partDialog = false
        this.song.calculateBpm()
      }
    },
    computed: {
      user() {
        return this.$store.getters.getUser
      }
    }
  }
</script>