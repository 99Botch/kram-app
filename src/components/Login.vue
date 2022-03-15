<template>
    <div class="form-pop" @keypress.enter="submitForm">

        <div class="form-modal">
            <div class="close-form">
                <img src="@/assets/close-o.svg" @click="closeForm($event)" id="CloseLogin"/>
            </div>

            <div class="log-credits">
                <h4>Enter your details</h4>
            </div>

            <div>
                <form>           
                    <p class="form-error" id="login-mail-error">{{ this.emailError }}</p>
                    <input type="text" id="email-login" name="email" v-model="form.email" required placeholder="AllanSmithee@mail.com" v-on:keyup="validation(); mailValidation();">
                    
                    <p class="form-error" id="login-password-error">{{ this.passwordError }}</p>
                    <input type="password" id="password-login" name="password" v-model="form.password" required placeholder="Password" v-on:keyup="validation(); passwordValidation()">
                </form>

                <div class="form-modal-btn">
                    <p class="form-error" id="login-form-error">{{ this.formError }}</p>
                    <button class="submit" id="submit-login" type="submit" @click="submitForm" disabled>Login</button>
                </div>

                <p class="regRedirect">Don't have an account yet? <span @click="closeForm($event)" id="Switch" >Sign up for one</span></p>

            </div>
        </div>

    </div>
</template>

<script>
    import { URI, axios, validator } from '@/plugins/index.js';

    export default {
        name: 'Login',
        
        data () {
            return {
                form: {
                    email: "",
                    password: "",
                },
                emailError: "",
                passwordError: "",
                formError: "",
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
                    if (error) this.formError = "Email or password invalid"
                });
            },

            // CLOSE FORM ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
            closeForm(){
                (event.target.id == "Switch") ? this.$emit('clicked', 'Switch') : this.$emit('clicked', 'CloseLogin');
            },

            // FORM VALIDATION ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
            validation(){
                if (document.getElementById("email-login").value.length !=0 && document.getElementById("password-login").value.length != 0) {
                    document.getElementById("submit-login").disabled = false;
                } else {
                    document.getElementById("submit-login").disabled = true;
                }
            },

            mailValidation(){
                let [length, format, error, warning, initial] = [document.getElementById("email-login").value.length, 
                    validator.validate(this.form.email), 
                    document.getElementById("login-mail-error"),
                    '#FFA500',
                    '#DB3C3A'];

                (length == 0) ? (this.emailError = "Enter your mail address", error.style.color = initial) : 
                    (length > 1 && !format) ? (this.emailError = "Enter a valid mail address", error.style.color = warning) : 
                    this.emailError = "";
            },

            passwordValidation(){
                (document.getElementById("password-login").value.length == 0) ? this.passwordError = "Enter your password" : this.passwordError = "";
            }
                
        },
    }
</script>


<style scoped lang="scss">

    form{
        display: flex;
        flex-direction: column; 
    }

    #login-form-error{
        padding-left: 20px;
    }

    #submit-login{
        margin-bottom:  0px;
    }

    .regRedirect{
        font-size: 14px;
        color: #222A;
        padding: 15px 0px 50px 20px;
        
        span{
            cursor: pointer;
            color: #0079C2AA;

            &:hover{
                text-decoration: underline;
            }
        }
    }

</style>