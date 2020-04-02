<template>
  <v-container>
    <v-row>
      <v-col cols="2">
        <compass/>
      </v-col>
      <v-col cols="10">
        <part />
      </v-col>
    </v-row>
    <v-row class="text-center">
      <v-col cols="3" class="text-right">
        <v-btn color="success"
               @click="playSequence"
               :disabled="isRunning"
        >Iniciar</v-btn>
      </v-col>
      <v-col cols="3">
        <v-btn color="error"
               @click="stopSequence"
               :disabled="!isRunning"
        >Detener</v-btn>
        <pre>
            {{part}}
        </pre>

      </v-col>
    </v-row>
  </v-container>
</template>

<script>

  export default {
    name: 'HelloWorld',

    methods: {
      playSequence(){
        this.$store.commit('init')
      },
      stopSequence(){
        this.$store.commit('finish')
      }
    },
    computed: {
      isRunning(){
        return this.$store.getters.getRunning
      },
      part(){
        return this.$store.getters.getPart
      }
    }

  }
</script>
