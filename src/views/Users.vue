<template>
    <div class="users" id="users">

        <p>Users</p>
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
    import axios from 'axios';

    export default {
        name: 'Users',

        data () {
            return {
                users: []
            }
        },

        mounted () {
            this.getUsers();
        },

        methods: {
            getUsers(){
                axios.get( `http://localhost:3000/users/` )
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