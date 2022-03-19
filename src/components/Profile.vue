<template>
        <div class="">

        <h1>Profile</h1>

        <div>
            <p> {{ user.username }} </p>
            <p> {{ user.email }} </p>
        </div>

        <!--<div v-if="!loading">
            <router-link :to="{ name:'EditUser', params:{ id: this.id } }"> update my profile </router-link>
            <button @click="deleteProfile"> Delete my profile</button>
        </div>-->

    </div>
</template>

<script>
    import { URI, axios } from '@/plugins/index.js';

    export default {
        name: 'Profile',

        components: {
        },

        data () {
            return {
                loading: true,
                id: sessionStorage.getItem("_id"),
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

<style scoped lang="scss">

    @media (max-width: 480px) {

    }

    @media (min-width: 480px) {

    }

</style>
