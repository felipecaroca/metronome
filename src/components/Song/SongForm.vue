<template>
  <div>
    <v-row>
      <v-col>
        <v-text-field v-model="songName"
                      label="Nombre de la Canción"
                      @change="addSongName"
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
              <v-btn icon dark @click="dialog = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
              <v-toolbar-title>Parte de la Canción</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>

            <v-card-text>
              <part-form />
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </div>
</template>

<script>
  export default {
    data:()=>({
      songName: '',
      dialog: false
    }),
    methods: {
      addSongName(){
        this.$store.commit('addSongName', this.songName)
      },
      saveSong(){
        this.$store.commit('calculateBpm')
      }
    }
  }
</script>