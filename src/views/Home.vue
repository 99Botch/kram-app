<template>

    <div>
    
        <span v-if="login">
            <Login @clicked="closeLoginForm" />
        </span>

        <div class="" id="home-page">
            
            <div id="home-nav">
                <div id="home-btn">
                    <router-link to="/">
                        <img src="@/assets/Logo.svg"/>
                    </router-link>
                </div>
                <div id="login">
                    <button @click="displayLogin">Log in</button>
                </div>
            </div>

            <div id="home-main">
                <h1>Unfold Memory</h1>
                    <button class="register-btn" >Create account</button> 
                    <button class="login-btn" @click="displayLogin">Log in</button>
            </div>
        
        </div>  
    </div>

</template>

<script>
    import Login from '@/components/Login.vue';


    export default {

        data() {
            return {
                login: false,
                register: false
            }
        },

        components: {
            Login
        },

        mounted () {},

        computed: {},

        methods: {
            async displayLogin(){
                this.login = true;
            },

            closeLoginForm (_value) {
                this.login = _value;
            }
        },

        props: {}
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    #home-page{
        // background-image: url('~@/assets/pexels-vlada-karpovich-4939620.jpg');
        background: linear-gradient( rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15) ), url('~@/assets/pexels-vlada-karpovich-4939620.jpg');
        height: 100vh;
        background-size:     cover;        
        background-repeat:   no-repeat;
        background-position: center center;  
        display: flex;
        flex-direction: column;
        h1{
            color: #FFF;
            font-weight: 600;
        }   
    }

    .register-btn{
        text-decoration: none;
        color: #fff;
        padding: 15px 0px;
        width: 240px;
        text-align: center;
        border-radius: 25px;
        background: rgb(0,121,194);
        background: linear-gradient(6deg, rgba(0,121,194,1) 0%, rgba(41,171,135,1) 100%);
        cursor: pointer;
        border: 0;
    }

    .login-btn{
        text-decoration: none;
        color: #fff;
        padding: 15px 0px;
        width: 240px;
        text-align: center;
        border-radius: 25px;
        border: 2px solid #FFF;
        background-color: transparent;
    }

    #home-main{
        display: flex;
        flex-direction: column;
        flex: 1;
        align-items: center;
        justify-content: center;
    }

    @media (max-width: 480px) {
        #home-page{
            h1{
                font-size: 36px;
                font-style: italic;
                padding-bottom: 75%;
            }
        }
        #login{
            display: none
        }
        #home-btn{
            padding: 15px 20px;
        }
        .register-btn{
            margin-bottom: 15px;
        }

    }

    @media (min-width: 480px) {
        #home-page h1{
            padding-bottom: 15px;
        }
        .login-btn{
            display: none;
        }
        #home-main{
            margin-bottom: 10%
        }

        #home-nav{
            display: grid;
            justify-content: center;
            grid-template-columns: 175px 1fr;
            height: 78px;

            div{
                display: flex;
                align-items: center;
                
            }
            #home-btn{
                justify-content: center;
            }
        }

        #login{
            justify-content: right;
            padding-right: 30px;
            button {
                color: #0079C2;
                text-decoration: none;
                font-size: 18px;
                background-color: #FFFFFA;
                padding: 10px 30px;
                border-radius: 5px;
                outline: 0;
                cursor: pointer;
                border: 0;
            }
        }
    }


</style>
