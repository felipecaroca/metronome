<template>
  <v-row>
    <v-col>
      <v-breadcrumbs :items="items" large></v-breadcrumbs>
    </v-col>
  </v-row>
</template>

<script>
  export default {
    props:['song'],
    computed:{
      items(){
        let tmp = []
        for (let part in this.song.parts){
          tmp.push({
            disabled: true,
            exact: false,
            href: '',
            link: false,
            text: this.song.parts[part].name,
            to: ''
          })
        }
        return tmp
      }
    }
  }
</script>
