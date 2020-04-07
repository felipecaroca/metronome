<template>
  <v-container>
    <v-row>
      <v-col>
        <v-text-field v-model="name"
                      label="Nombre de la Parte"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <chord-form />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <song-part-name-view />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn color="primary"
               @click="addPart"
        ><v-icon>mdi-floppy</v-icon> Guardar Parte
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      name: '',
    }),
    methods: {
      addPart() {
        if (this.partLines && this.partLines.length > 0 && this.name)
          this.$store.commit('addPart', this.name)
        else if (!this.name)
          this.$store.commit('openSnackBar', 'debe agregar el nombre')
        else
          this.$store.commit('openSnackBar', 'la parte no tiene acordes')
      }
    },
    computed:{
      partLines(){
        return this.$store.getters.getPartLines
      }
    }
  }
</script>
