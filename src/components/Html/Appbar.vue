<template>
  <v-app-bar
      app
      color="primary"
      dark
  >
    <router-link to="/">
      <div class="d-flex align-center">
        <v-img
            alt="Vuetify Logo"
            class="shrink mr-2"
            contain
            :src="logo"
            transition="scale-transition"
            width="80"

        />

      </div>
    </router-link>

    <v-spacer/>

    <v-btn
        to="/login"
        color="primary"
        v-if="user"
    >
      <span class="mr-2">Iniciar Sesión</span>
      <v-icon>mdi-login</v-icon>
    </v-btn>
    <v-menu bottom left>
      <template v-slot:activator="{ on }">
        <v-btn
            dark
            icon
            v-on="on"
        >
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item
            @click="logout"
        >
          <v-list-item-title>Cerrar Sesión</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>

</template>

<script>
  import logo from "../../assets/logo.png";

  export default {
    data: () => ({
      logo
    }),
    methods:{
      logout(){

      }
    },
    computed:{
      user(){
        return this.$store.getters.getUser
      }
    }
  }
</script>
