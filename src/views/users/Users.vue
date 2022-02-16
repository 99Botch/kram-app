<template>
    <Navigation/>

    <div class="" id="users">

        <h1>Users</h1>
        <hr/>

        <div v-for="user of users" 
            :key="user.id"
        >
            <router-link :to="{ name:'User', params:{ id: user._id } }"> {{ user.username }} </router-link>
            <p> {{ user.email }} </p>
            <hr/>
        </div>

    </div>

</template>

<script>
    import Navigation from '@/components/Navigation.vue';
    import axios from 'axios';
    import { URI } from '@/plugins/url.js';

    export default {
        name: 'Users',

        data () {
            return {
                users: []
            }
        },

        components: {
            Navigation,
        },

        mounted () {
            this.getUsers();
        },

        methods: {
            getUsers(){
                axios.get( `${ URI }/users/` )
                    .then(response => {
                        this.users = response.data;
                    })
                    .catch(e => { this.errors.push(e) })
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    ul{
        list-style-type: none;
    }
</style>