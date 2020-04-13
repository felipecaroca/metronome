<template>
  <v-dialog
      v-model="isLoading"
      persistent
      width="300"
  >
    <v-card
        color="primary"
        dark
    >
      <v-card-text>
        Por Favor Espere...
        <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
        ></v-progress-linear>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    computed:{
      isLoading(){
        return this.$store.getters.getLoading
      }
    }
  }
</script>
