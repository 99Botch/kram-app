<template>
    <h1>Kram</h1>
    <button><router-link to="/register">Register</router-link></button>
    <button><router-link to="/login">Login</router-link></button>
    <Logout />

    <Navigation />
</template>

<script>
import Navigation from '@/components/Navigation.vue';
import Logout from '@/components/Logout.vue';

export default {
    components: {
        Navigation,
        Logout
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
