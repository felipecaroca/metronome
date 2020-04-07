<template>
  <v-container>
    <part-line-view :notes="notes" v-for="notes in part.lines"
                    :key="notes.$id" :deletable="deletable"/>
  </v-container>
</template>

<script>
  export default {
    props: ['part', 'deletable'],
    data: ()=>({

    }),

  }
</script>
