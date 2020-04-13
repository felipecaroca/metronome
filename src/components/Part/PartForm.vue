<template>
  <v-container>
    <v-form v-model="partValid" @submit.prevent="addPart" ref="partForm">
      <v-row>
        <v-col>
          <v-text-field v-model="name"
                        label="Nombre de la Parte"
                        required
                        :rules="partNameRules"
                        @keyup.enter="addPart"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <chord-form/>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <song-part-name-view/>
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
  export default {
    data: () => ({
      name: '',
      partValid: false,
      partNameRules: [
        v => !!v || 'Nombre de la parte es Requerido',
      ]
    }),
    methods: {
      addPart() {
        if (this.$refs.partForm.validate()){
          if (this.partLines && this.partLines.length > 0)
            this.$store.commit('addPart', this.name)
          else
            this.$store.commit('openSnackBar', 'la parte no tiene acordes')
        }
      }
    },
    computed: {
      partLines() {
        return this.$store.getters.getPartLines
      }
    }
  }
</script>
