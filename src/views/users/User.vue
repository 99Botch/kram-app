<template>
    <div class="users" id="user">

        <p>User's Profile</p>

        <div>
            <p> {{ user.username }} </p>
            <p> {{ user.email }} </p>
        </div>

        <div v-if="!loading">
            <router-link :to="{ name:'EditUser', params:{ id: this.id } }"> update my profile </router-link>
            <button @click="deleteProfile"> Delete my profile</button>
        </div>

    </div>
</template>

<script>
    import axios from 'axios';
    import { URI } from '@/plugins/url.js';

    export default {
        name: 'User',
        
        data () {
            return {
                loading: true,
                id: this.$route.params.id,
                user: []
            }
        },

        mounted () {
            this.getUser();
        },

        methods: {
            getUser(){
                axios.get( `${ URI }/users/${ this.id }` )
                    .then(response => {
                        this.user = {
                            username: response.data.username,
                            email: response.data.email,
                        }
                        this.loading = !this.loading;
                    })
                    .catch(error => {
                        console.log(error)
                        console.log(error.response.data)
                    })
            },
            
            async deleteProfile(){
                await axios.get(`${ URI }/users/session/${ this.id }`)
                    .then((res) => { 
                        if(res.status === 200) { 
                            this.token = res.data.token; 

                            axios.delete(`${ URI }/users/${ this.id }`, {
                                headers: {
                                        Authorization: `Bearer ${this.token}`,
                                        'Content-Type': 'application/json'
                                    }
                                })
                                .then((res) => {
                                    if(res.status === 200) {
                                        axios.delete(`${ URI }/users/logout/${ this.id }`, {
                                            headers: {
                                                    Authorization: `Bearer ${this.token}`,
                                                    'Content-Type': 'application/json'
                                                }
                                            })
                                            .then((res) => {
                                                if(res.status === 200) {
                                                    sessionStorage.removeItem('_id');
                                                    this.token = null;
                                                    this.id = null;
                                                    this.$router.push({ path : '/' });
                                                }
                                            })
                                    }
                                })
                        }
                    })
                    .catch((error) => {
                        console.log("error: " + error);
                    });
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    ul{
        list-style-type: none;
    }
    button{
        color: red;
        cursor: pointer;
    }
</style>