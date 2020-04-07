<template>
  <v-card v-if="song.parts && song.parts.length > 0"
  >
    <v-tabs
        v-model="tab"
        background-color="primary"
        dark
        center-active
    >
      <v-tab
          v-for="part in song.parts"
          :key="part.$id"
      >
        {{ part.name }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item
          v-for="part in song.parts"
          :key="part.$id"
      >
        <v-card flat>
          <v-card-text>
            <part-view :part="part" :deletable="false" />
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      tab: null
    }),
    methods: {

    },
    computed: {
      song(){
        return this.$store.getters.getSong
      }
    }
  }
</script>
