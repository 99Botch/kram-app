<template>
    <Navigation/>

    <div class="" id="login">

        <h1>Login form</h1>

        <div>
            <form>                          
                <label for="email">Email:</label><br>
                <input type="text" id="email" name="email" v-model="form.email" required><br>
                
                <label for="password">Password:</label><br>
                <input type="password" id="password" name="password" v-model="form.password" required><br>
                <br>
            </form>
            
            <div class="button">
                <button class="submit" type="submit" @click="submitForm">Login</button>
            </div>
        </div>

    </div>
</template>

<script>
    import Navigation from '@/components/Navigation.vue';
    import axios from 'axios';
    import { URI } from '@/plugins/url.js';
    import store from '@/store/index.js';

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

        computed: {
            signIn () {
                return store.state.login // get state
            }
        },

        components: {
            Navigation,
        },

        mounted () {},

        methods: {
            async submitForm(){
                console.log(!store.state.login)
                const json = JSON.stringify(this.form);
                console.log(json);

                await axios.post(`${ URI }/users/login`, json, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then((res) => {
                    if(res.status === 200) {
                        sessionStorage.setItem('_id', res.data.user_id);
                        store.commit(!store.state.login)
                        // this.$router.push({ path : '/' });
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>