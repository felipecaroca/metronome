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
    <v-btn class="elevation-0 transparent" to="/">
      <v-icon>mdi-home</v-icon>
    </v-btn>
    <v-btn  v-if="songs.length > 0" to="/songs" class="transparent elevation-0"  tile >
      Mis Canciones
      <v-icon>mdi-music</v-icon>
    </v-btn>
    <v-btn class="elevation-0 transparent" to="/about">
      <v-icon>mdi-info</v-icon>
      Acerca de...
    </v-btn>
    <v-spacer/>
    <v-list class="transparent" v-if="user">
      <v-list-item>
        <v-list-item-avatar>
          <v-img :src="user.photoURL"/>
        </v-list-item-avatar>
        {{user.displayName}}
      </v-list-item>
    </v-list>

    <v-btn
        to="/login"
        color="primary"
        v-if="!user.displayName"
    >
      <span class="mr-2">Iniciar Sesión</span>
      <v-icon>mdi-login</v-icon>
    </v-btn>
    <v-menu bottom left v-else>
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
            @click="toggleDarkMode"
        >
          <v-icon>mdi-brightness-6</v-icon>
          <v-list-item-title>
             {{dark? 'Aclarar': 'Oscurecer'}}
          </v-list-item-title>
        </v-list-item>
        <v-list-item to="/user_manual">
          <v-icon>mdi-file</v-icon>
          <v-list-item-title>Manual de Uso</v-list-item-title>
        </v-list-item>
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
  import logo from "../../assets/logo.png"
  import firebase from "firebase/app"
  import {Song} from "../../models/Song"

  export default {
    data: () => ({
      logo
    }),
    created() {
      let self = this
      firebase.auth().onAuthStateChanged(function (user) {
        if (user){
          let songs = firebase.firestore().collection('users')
            .doc(user.uid).collection('songs')
          songs.onSnapshot(snapshot => {
            let songsList = []
            snapshot.docs.forEach(doc => {
              let song = new Song(doc.data())
              song.id = doc.id
              songsList.push(song)

            })
            self.$store.commit('setSongs', songsList)
          }, () => {

          })
        } else{
          self.$store.commit('setSongs', [])
        }
      })
    },
    methods: {
      logout() {
        this.$store.commit('logout')
        this.$forceUpdate()
      },
      toggleDarkMode(){
        this.$vuetify.theme.dark = !this.$vuetify.theme.dark
      }
    },
    computed: {
      user() {
        return this.$store.getters.getUser
      },
      songs() {
        return this.$store.getters.getSongs
      },
      dark(){
        return this.$vuetify.theme.dark
      }
    }
  }
</script>
