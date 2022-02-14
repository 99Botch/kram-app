<template>
    <div class="users" id="user">

        <p>User's Profile</p>

        <div>
            <p> {{ user.username }} </p>
            <p> {{ user.email }} </p>
        </div>

    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'User',
        
        data () {
            return {
                id: this.$route.params.id,
                user: []
            }
        },

        mounted () {
            this.getUser();
        },

        methods: {
            getUser(){
                axios.get( `http://localhost:3000/users/${this.id}` )
                    .then(response => {
                        this.user = response.data;
                        this.user = {
                            username: this.user.username,
                            email: this.user.email,
                        }
                    })
                    .catch(error => {
                        console.log(error)
                        console.log(error.response.data)
                    })
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