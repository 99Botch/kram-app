<template>
    <div id="nav">
        
        <router-link to="/">Home</router-link> |
        <router-link to="/users">Users</router-link> |
        <span v-if="!$store.state.sessionState || null">
                <router-link to="/register">Register</router-link> |
                <router-link to="/login">Login</router-link> 
        </span>

        <span v-else>
            <router-link to="/decks">My decks</router-link> |
            <router-link to="/cards">Cards</router-link> |
            <Logout />
        </span>
        
    </div>
</template>

<script>
    import Logout from '@/components/Logout.vue';
    import axios from 'axios';
    import { URI } from '@/plugins/url.js';

    export default {
        name: 'Navigation',

        components: {
            Logout
        },

        mounted () {
            this.getSession();
            this.setSession();
        },

        computed: {
            signIn () { 
                // get state
                return this.$store.getters.getSession 
            }
        },

        methods: {
            async getSession(){
                let id = sessionStorage.getItem("_id");

                if(id){
                    await axios.get( `${ URI }/users/session/${ id }` )
                    // .then(response => {
                    //     console.log(response)
                    // })
                    .catch(error => {
                        console.log(error)
                        console.log(error.response.data)
                        sessionStorage.removeItem('_id');
                        sessionStorage.setItem('session', false);
                        this.$store.dispatch('signIn', false);
                    })
                }
            },
            setSession(){
                var session = sessionStorage.getItem("session");
                (session === 'false') ? 
                    this.$store.dispatch('signIn', false) : 
                    this.$store.dispatch('signIn', true);
            }
        },

        props: {}
        
    }
    
</script>

<style scoped lang="scss">
    a{
        color: #42b883;
    }
</style>
