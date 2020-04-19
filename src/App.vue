<template>
  <v-app>
    <loading-dialog />
    <snackbar/>
    <app-bar />
    <v-content>
      <router-view/>

    </v-content>
    <footer-view/>
  </v-app>
</template>

<script>

  export default {

  };
</script>
