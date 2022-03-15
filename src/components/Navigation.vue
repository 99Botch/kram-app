<template>
    <nav>
        
        <div id="logo">
            <router-link to="/">
                <img src="@/assets/Logo.svg"/>
            </router-link>
        </div>

        <div class="search-bar">
            <div>
                <svg width="24" height="24"  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="" id="lense">
                    <path fill-rule="evenodd" clip-rule="evenodd" fill="currentColor"
                        d="M18.319 14.4326C20.7628 11.2941 20.542 6.75347 17.6569 3.86829C14.5327 0.744098 9.46734 0.744098 6.34315 3.86829C3.21895 6.99249 3.21895 12.0578 6.34315 15.182C9.22833 18.0672 13.769 18.2879 16.9075 15.8442C16.921 15.8595 16.9351 15.8745 16.9497 15.8891L21.1924 20.1317C21.5829 20.5223 22.2161 20.5223 22.6066 20.1317C22.9971 19.7412 22.9971 19.1081 22.6066 18.7175L18.364 14.4749C18.3493 14.4603 18.3343 14.4462 18.319 14.4326ZM16.2426 5.28251C18.5858 7.62565 18.5858 11.4246 16.2426 13.7678C13.8995 16.1109 10.1005 16.1109 7.75736 13.7678C5.41421 11.4246 5.41421 7.62565 7.75736 5.28251C10.1005 2.93936 13.8995 2.93936 16.2426 5.28251Z"
                    />
                </svg>
            </div>
            <input type="text" placeholder="Search " id="searchBar" @keypress="searchItem">
        </div>

        <div class="left-side">
            <img src="@/assets/User.svg"/>
            <!--<span v-if="$store.state.sessionState || null">
                <router-link to="/decks">My decks</router-link> |
                <router-link to="/cards">Cards</router-link> |
                <Logout />
            </span> -->

        </div>
        
    </nav>
</template>

<script>
    import { URI, axios } from '@/plugins/index.js';
    // import Logout from '@/components/Logout.vue';

    export default {
        name: 'Navigation',

        components: {
            // Logout
        },

        data () {
            return {
                page: "",
            }
        },

        mounted () {
            this.getSession();
            this.setSession();
            this.placeholder();
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
            },
            placeholder(){
                let page = window.location.href.slice(22,26);

                if(page == "deck") {
                    document.getElementById('searchBar').placeholder = "Search a deck..";
                    this.page = "deck";
                }
                else if(page == "card") {
                    document.getElementById('searchBar').placeholder = "Search a card..";
                    this.page = "card";
                }
            },
            searchItem(){}
        },        
    }
    
</script>

<style scoped lang="scss">

    @media (min-width: 480px) {
        nav{
            display: grid;
            grid-template-columns: 175px 1fr 15%;
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

    #lense{
        color: #333;
    }

    .search-bar{
        div{
            padding: 0px 7px 0px 15px;
        }
        input {
            height: 100%;
            width: 100%;
            border-width: 0px;
            outline: none;
            font-size: 18px;

            &:focus{
                color: #333;
            }
        }

    }

    .left-side {
        display: flex;
        justify-content: flex-end;
        padding-right: 35px;

        img{
            width: 30px;
            height: 30px;
            border-radius: 50px;
            border: 1px solid #333;
            cursor: pointer;
            padding: 1px;
        }
    }

    input::-webkit-input-placeholder {
        color:#DDDDDD;
        opacity: 1;
    }
    input::-moz-placeholder {
        color:#DDDDDD;
        opacity: 1;
    }
    input::-ms-placeholder {
        color:#DDDDDD;
        opacity: 1;
    }
    input::placeholder {
        color:#DDDDDD;
        opacity: 1;
    }
    

</style>
