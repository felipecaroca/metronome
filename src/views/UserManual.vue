<template>
  <iframe :src="manual" width="100%" height="100%"></iframe>
</template>

<script>

  import manual from '../assets/manual_metronomo_visual.pdf'

  export default {
    data:()=>({
      manual
    })
  }
</script>
