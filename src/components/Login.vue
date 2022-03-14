<template>
    <div class="form-login">

        <div class="form-login-cpnt" id="loginBox">
            <div class="close-form">
                <img src="@/assets/close-o.svg" @click="closeForm"/>
            </div>

            <div class="log-credits">
                <h4>Enter your details</h4>
            </div>

            <div>
                <form>           
                    
                    <p class="form-error" id="login-mail-error"></p>
                    <input type="text" id="email-login" name="email" v-model="form.email" required placeholder="AllanSmithee@mail.com" v-on:keyup="validation">
                    
                    <p class="form-error" id="login-password-error"></p>
                    <input type="password" id="password-login" name="password" v-model="form.password" required placeholder="Password" v-on:keyup="validation">
                </form>

                <div class="form-login-btn">
                    <button class="submit" id="submit-login" type="submit" @click="submitForm" disabled>Login</button>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    // import axios from 'axios';
    import { URI, axios } from '@/plugins/index.js';

    export default {
        name: 'Login',
        
        data () {
            return {
                form: {
                    email: "",
                    password: ""
                }
            }
        },

        components: {},

        mounted () {},

        methods: {
            async submitForm(){

                const json = JSON.stringify(this.form);

                await axios.post(`${ URI }/users/login`, json, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then((res) => {
                    if(res.status === 200) {
                        sessionStorage.setItem('_id', res.data.user_id);
                        sessionStorage.setItem('session', true);
                        this.$router.push({ path : '/decks' });
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
            },

            // CLOSE FORM
            closeForm(){
                this.$emit('clicked', false)
            },

            // CLOSE FORM
            validation(){
                if (document.getElementById("email-login").value.length !=0 && document.getElementById("password-login").value.length != 0) {
                    document.getElementById("submit-login").disabled = false;
                } else {
                    document.getElementById("submit-login").disabled = true;
                }
            },

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

    .close-form{
        display: flex;
        justify-content: flex-end;
        margin-bottom: 20px;
        
        img{
            cursor: pointer;
            opacity: .4;
            transition-duration: 0.6s;
            transition-property: transform;
            width: 28px;
            height:28px ;

            &:hover{
                opacity: .75;
                transform: rotate(180deg);
                -webkit-transform: rotate(180deg);
            }
        }
    }

    form{
        display: flex;
        flex-direction: column; 

        input{
            outline: 0;
            height: 46px;
            font-size: 16px;
            border-width: 0px;
            background-color: #DDDDDD66;
            border-radius: 5px;
            color: #222;
            margin-bottom: 15px;
            padding: 8px 12px;

            &:hover{
                background-color: #DDDDDD44;
            }
            &::placeholder{
                color: #222;
            }
        }

        .form-error{
            color: #DB3C3A;
            font-size: 14px;
            margin-bottom: 10px;
            height: 16px;
        }
    }

    .form-login{
        &-cpnt{
            padding: 10px 25px;
        }

        h4{
            font-weight: 600;
            font-style:italic;
            margin-bottom: 20px;
        }

        &-btn button{
            text-decoration: none;
            color: #fff;
            width: 100%;
            height: 46px;
            text-align: center;
            border-radius: 25px;
            cursor: pointer;
            border: 0;
            margin: 25px 0px 60px 0px;
            background: rgb(0,121,194);
            background: linear-gradient(6deg, rgba(0,121,194,1) 0%, rgba(41,171,135,1) 100%);
        }

        &-btn button:disabled,
        &-btn button[disabled]{
            background: #DDD;
            cursor: auto;
        }
    }

    @media (max-width: 480px) {
        .form-login{
            position: absolute;
            width: 100%;
            height: 100%;
            background-color: #fff;
        }
    }

    @media (min-width: 480px) {
        .form-login{
            position: absolute;
            display: flex;
            width: 100%;
            height: 100%;
            justify-content: center;
            align-items: center;
            background-color: #2226;

            &-cpnt{
                background-color: white;
                width: 392px;
                border-radius: 10px;
            }


        }

    .log-credits{
        display: flex;
        justify-content: space-around;
    }

    }
</style>