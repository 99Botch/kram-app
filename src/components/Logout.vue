<template>
    <button>
        <router-link to="/logout" @click="logout">Logout</router-link>
    </button>
</template>

<script>
    import { URI, axios } from '@/plugins/index.js';


    export default {
        name: 'Logout',
        
        data () {
            return {
                id: null,
                token: null
            }
        },

        mounted () {},

        methods: {
            async logout(){
                
                let _id = sessionStorage.getItem('_id');
                this.id = _id;
                
                await axios.get(`${ URI }/users/session/${ this.id }`)
                    .then((res) => { 
                        if(res.status === 200) { 
                            this.token = res.data.token; 
                        
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
                                    sessionStorage.setItem('session', false);
                                    this.$router.push({ path : '/' });
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
    button {
        background-color: red;
        border-width:0;
        a{
            color: white;
        }
    }
</style>
