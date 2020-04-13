<template>
  <div>
    <v-form v-model="songValid"  ref="songForm" @submit.prevent="saveSong">
      <v-row>
        <v-col>
          <v-text-field v-model="songName"
                        label="Nombre de la Canción"
                        @change="addSongName"
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
                <part-form/>
              </v-card-text>
            </v-card>
          </v-dialog>
        </v-col>
      </v-row>
    </v-form>

  </div>
</template>

<script>
  export default {
    data: () => ({
      songName: '',
      dialog: false,
      songValid: false,
      nameRules: [
        v => !!v || 'Nombre de la canción es Requerido',
      ],
    }),
    methods: {
      addSongName() {
        this.$store.commit('addSongName', this.songName)
      },
      saveSong() {
        if(this.$refs.songForm.validate()){
          if (this.$store.getters.getSong.parts.length === 0)
            this.$store.commit('openSnackBar', 'Debe agregar partes a la canción presionando el botón AGREGAR PARTE')
          else {
            this.$store.commit('calculateBpm')
            if (!this.user.uid)
              this.$router.push('/login')
            else
              this.$store.commit('saveSong')
          }
        }
      },
      closeDialog() {
        this.dialog = false
        this.$store.commit('calculateBpm')
      }
    },
    computed: {
      user() {
        return this.$store.getters.getUser
      }
    }
  }
</script>