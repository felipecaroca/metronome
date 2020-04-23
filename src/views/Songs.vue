<template>
  <v-container>
    <v-row>
      <v-col align="right" justify="right">
        <v-btn small
               fab
               color="primary"
               to="/"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <v-simple-table fixed-header height="300px">
      <template v-slot:default>
        <thead>
        <tr>
          <th class="text-left">Nombre</th>
          <th class="text-left">Opciones</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in songs" :key="item.id">
          <td>{{ item.name }}</td>
          <td>
            <v-tooltip left>
              <template v-slot:activator="{on}">
                <v-btn fab
                       class="ma-1"
                       small
                       @click="setCurrent(item)"
                       color="success"
                       v-on="on"
                >
                  <v-icon>mdi-music</v-icon>
                </v-btn>
              </template>
              <span>Reproducir Canción</span>
            </v-tooltip>

            <v-tooltip top>
              <template v-slot:activator="{on}">
                <v-btn fab
                       class="ma-1"
                       small
                       @click="goEdit(item)"
                       color="primary"
                       v-on="on"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </template>
              <span>Editar Canción</span>
            </v-tooltip>

            <v-tooltip right>
              <template v-slot:activator="{ on }">
                <v-btn fab
                       class="ma-1"
                       small
                       @click="deleteSong(item)"
                       color="error"
                       v-on="on"

                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </template>
              <span>Eliminar Canción</span>
            </v-tooltip>

          </td>
        </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-container>

</template>

<script>
  export default {
    methods: {
      setCurrent(song) {
        this.$router.push({
          name: 'player',
          params: {
            song: song
          }
        })
      },
      deleteSong(song) {
        this.$store.commit('deleteSong', song)
      },
      goEdit(song){
        this.$router.push({
          name: 'home',
          params: {
            song: song
          }
        })
      }
    },
    computed: {
      songs() {
        return this.$store.getters.getSongs
      }
    }
  }
</script>
