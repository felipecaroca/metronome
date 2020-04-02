<template>
  <v-row>
    <v-col>
      <v-text-field v-model="name"
                    label="Nombre"
      />

      <part-line-form />
      <v-btn color="primary"
             @click="addPart"
      >+ Guardar Parte
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
  export default {
    name: "Part",
    data: () => ({
      name: '',
      lines: []
    }),
    methods: {
      addPart(){
        this.$store.commit('addPart')
      }
    }
  }
</script>
