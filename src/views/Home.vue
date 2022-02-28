<template>
    <Navigation/>

    <div class="" id="home_view">
        <h1>Welcome to Kram</h1>
    </div>

</template>

<script>
    import Navigation from '@/components/Navigation.vue';
    import axios from 'axios';
    import { URI } from '@/plugins/url.js';

    export default {

        data() {
            return {}
        },

        components: {
            Navigation,
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
                console.log(id)
                if(id){
                    await axios.get( `${ URI }/users/session/${ id }` )
                    .then(response => {
                        console.log(response)
                    })
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
