<template>
  <div class="home">
    <mainpage />
  </div>
</template>

<script>
// @ is an alias to /src
import mainpage from '@/components/Home.vue'

export default {
  name: 'Home',
  components: {
    mainpage
  }
}
</script>
