<template>
  <v-row>
    <v-col>
      <v-text-field v-model="name"
                    label="Nombre"
      />

      <part-line-form />
      <v-btn color="primary"
      >+ Agregar Línea
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
      addLine(){

      }
    }
  }
</script>

<style scoped>

</style>