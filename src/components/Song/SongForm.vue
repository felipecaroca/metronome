<template>
  <div>
    <v-form v-model="songValid"  ref="songForm" @submit.prevent="saveSong">
      <v-row>
        <v-col>
          {{song}}
          <v-text-field v-model="song.name"
                        label="Nombre de la Canción"
                        required
                        :rules="nameRules"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn color="success"
                 @click="saveSong"
          >
            <v-icon>mdi-floppy</v-icon>
            Guardar
          </v-btn>
          <v-dialog
              v-model="dialog"
              fullscreen hide-overlay
              transition="dialog-bottom-transition"

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
                <part-form :song="song" />
              </v-card-text>
            </v-card>
          </v-dialog>
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
      dialog: false,
      songValid: false,
      nameRules: [
        v => !!v || 'Nombre de la canción es Requerido',
      ],
    }),
    methods: {
      saveSong() {
        if(this.$refs.songForm.validate()){
          if (this.song.parts.length === 0)
            this.$store.commit('openSnackBar', {
              message: 'Debe agregar partes a la canción presionando el botón AGREGAR PARTE',
              color: 'error'
            })
          else {
            this.song.calculateBpm()
            if (!this.user.uid)
              this.$router.push('/login')
            else
              this.$store.commit('saveSong')
          }
        }
      },
      closeDialog() {
        this.dialog = false
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