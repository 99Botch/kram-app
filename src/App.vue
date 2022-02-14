<template>
    <h1>Kram</h1>
    <button><router-link to="/register">Register</router-link></button>

    <Navigation />
    <!--<h2>Navigation</h2>
    <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/users">Users</router-link>
    </div>

  <router-view/>-->
</template>

<script>
import Navigation from '@/components/Navigation.vue';

export default {
    components: {
        Navigation
    }
}
</script>

<style lang="scss">
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        text-align: center;
        margin-top: 60px;
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }
</style>
