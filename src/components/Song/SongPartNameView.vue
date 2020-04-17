<template>
  <v-row>
    <v-col>
      <v-btn v-for="part in song.parts" :key="part.$id"
             outlined
             color="primary"
             class="elevation-0 ma-1"
             @click="emitPart(part)"
      >
        {{part.name}}
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
  export default {
    props:['song'],
   methods:{
      emitPart(part){
        this.$emit('click', part)
      }
   }
  }
</script>
