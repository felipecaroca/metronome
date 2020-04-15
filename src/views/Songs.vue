<template>
  <v-container>

      <v-simple-table fixed-header height="300px">
        <template v-slot:default>
          <thead >
          <tr>
            <th class="text-left">Name</th>
            <th class="text-left">Opciones</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in songs" :key="item.id">
            <td>{{ item.name }}</td>
            <td>
              <v-btn fab
                     small
                     @click="setCurrent(item)"
                     color="success"
              >
                <v-icon>mdi-music</v-icon>
              </v-btn>
            </td>
          </tr>
          </tbody>
        </template>
      </v-simple-table>
  </v-container>

</template>

<script>
  export default {
    methods:{
      setCurrent(song){
        this.$store.commit('setSong', song)
        console.log(song.compass)
        this.$store.commit('setCompass', song.compass)
        this.$forceUpdate()
      }
    },
    computed:{
      songs(){
        return this.$store.getters.getSongs
      }
    }
  }
</script>
