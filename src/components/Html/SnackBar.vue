<template>
  <div class="text-center ma-2">
    <v-snackbar
        :color="snackbar.color"
        v-model="snackbar.visible"
        @submit.prevent="closeSnackBar"
    >
      {{ snackbar.message }}
      <v-btn
          text
          @click.prevent="closeSnackBar"
      >
        Cerrar
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
  export default {
    methods:{
      closeSnackBar(){
        this.$store.commit('closeSnackBar')
      }
    },
    computed:{
      snackbar(){
        return this.$store.getters.getSnackBar
      }
    }
  }
</script>
