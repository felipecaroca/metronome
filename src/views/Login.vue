<template>
  <v-row>
    <v-col>
      <div id="firebaseui-auth-container"></div>
    </v-col>
  </v-row>
</template>

<script>
  import firebase from 'firebase/app'
  import * as firebaseUi from 'firebaseui'

  export default {
    data() {
      return {
        song: {},
        ui: null,
        uiConfig: {
          callbacks: {
            // signInSuccessWithAuthResult: function (authResult,redirectUrl) {
            //     console.log(redirectUrl)
            //     return authResult;
            // },
            // uiShown: function() {
            //    // Hide the loader.
            // }
          },
          signInFlow: 'popup',
          signInSuccessUrl: '/',
          signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            firebase.auth.EmailAuthProvider.PROVIDER_ID,
            firebase.auth.TwitterAuthProvider.PROVIDER_ID,
            firebase.auth.GithubAuthProvider.PROVIDER_ID
          ],
          tosUrl: '/service',   // Terms of service url.
          privacyPolicyUrl: '/privacy' // Privacy policy url.

        }

      }
    },
    mounted() {
      this.ui = firebaseUi.auth.AuthUI.getInstance() || new firebaseUi.auth.AuthUI(firebase.auth());
      this.ui.start('#firebaseui-auth-container', this.uiConfig)
    }
  }
</script>
