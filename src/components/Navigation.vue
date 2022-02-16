<template>
    <div id="nav">
        
        <router-link to="/">Home</router-link> |
        <router-link to="/users">Users</router-link> |
        <router-link to="/register">Register</router-link> |
        <router-link to="/login">Login</router-link> | 
        
        <Logout />
    </div>
</template>

<script>
    import Logout from '@/components/Logout.vue';

    export default {
        name: 'Navigation',
        components: {
            Logout
        },
        
    }
    
</script>

<style scoped lang="scss">
    a{
        color: #42b883;
    }
</style>
