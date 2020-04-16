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
    watch:{
      activeTab:function(){
        if (this.tab !== this.activeTab){
          this.tab = this.activeTab
        }

      }
    },
    methods: {


    },
    computed: {
      song(){
        return this.$store.getters.getSong
      },
      bpmCounter(){
        return this.$store.getters.getBpmCounter
      },
      parts(){
        this.song.parts.forEach(part=>{
          part.active = this.bpmCounter >= part.from && this.bpmCounter <= part.to
        })
        return this.song.parts
      },
      activeTab(){
        let tmp = 0
        this.parts.forEach((part, index)=>{
          if (part.active)
            tmp = index
        })
        return tmp
      }
    }
  }
</script>
