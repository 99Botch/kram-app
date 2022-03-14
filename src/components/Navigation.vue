<template>
    <nav>
        
        <div id="logo">
            <router-link to="/">
                <img src="@/assets/Logo.svg"/>
            </router-link>
        </div>
        <div>bite</div>
        <div>            
            <span v-if="!$store.state.sessionState || null">
               <router-link to="/register">Register</router-link> |
                <router-link to="/login">Login</router-link>
            </span>

            <span v-else>
                <router-link to="/decks">My decks</router-link> |
                <router-link to="/cards">Cards</router-link> |
            <Logout />
        </span> </div>
        
    </nav>





</template>

<script>
    import Logout from '@/components/Logout.vue';
    import { URI, axios } from '@/plugins/index.js';

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

    @media (min-width: 480px) {
        nav{
            display: grid;
            grid-template-columns: 175px repeat(2, 1fr);
            height: 78px;
            align-items: center;
            border-bottom: 1px solid #DDDDDD;
            box-shadow: 0px 1.1px 1.4px -16px rgba(0, 0, 0, 0.028),  0px 3.8px 4.7px -16px rgba(0, 0, 0, 0.042), 0px 17px 21px -16px rgba(0, 0, 0, 0.07);
            div{
                height: 100%;
                display: flex;
                align-items: center;
            }
        }
    }

    a{}

    #logo{
        border-right: 1px solid #DDDDDD;
        justify-content: center;
    }
</style>
