<template>
  <v-app> 
  <Navbar />
  <v-content class="mx-8 my-8" >
    <router-view></router-view>
  </v-content>
  </v-app>  
</template>

<script>
import Navbar from './components/Navbar.vue'

export default {
  name: 'App',
  components: {Navbar},

  data: () => ({
      drawer: false,
    }),
  }
</script>
