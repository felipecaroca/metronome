<template>
  <v-app>
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
    name: 'App',


  };
</script>
