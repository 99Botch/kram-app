<template>
  <Home msg="Welcome to Kram"/>
</template>

<script>
import Home from './components/Home.vue'

export default {
  name: 'App',
  components: {
    Home
  }
}
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        text-align: center;
        margin-top: 60px;
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }
</style>
