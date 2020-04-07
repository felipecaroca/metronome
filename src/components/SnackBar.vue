<template>
  <div class="text-center ma-2">
    <v-snackbar
        v-model="snackbar.visible"
    >
      {{ snackbar.message }}
      <v-btn
          color="pink"
          text
          @click="closeSnackBar"
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
