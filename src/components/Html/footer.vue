<template>
  <v-footer
      color="gray  lighten-1"
      padless
  >
    <v-row
        justify="center"
        no-gutters
    >
      <v-col
          class="gray lighten-1 py-4 text-center text--disabled"
          cols="12"
      >
        <div>
          {{ new Date().getFullYear() }} — <strong>Metr&oacute;nomo Visual</strong>
        </div>
        <router-link to="/privacy">Politica de Privacidad</router-link> |
        <router-link to="/service">Condiciones del Servicio</router-link>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
  export default {
  }
</script>
