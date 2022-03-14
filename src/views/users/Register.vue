<template>
    <Navigation/>

    <div class="" id="register">

        <h1>Register form</h1>

        <div>
            <form>
                <label for="username">Username:</label><br>
                <input type="text" id="username" name="username" v-model="form.username" required><br>                
                
                <label for="email">Email:</label><br>
                <input type="text" id="email" name="email" v-model="form.email" required><br>
                
                <label for="password">Password:</label><br>
                <input type="password" id="password" name="password" v-model="form.password" required><br>
                
                <label for="repeat_password">Repeat password:</label><br>
                <input type="password" id="repeat_password" name="repeat_password" v-model="form.repeat_password" required><br>

                <br>
            </form>
            
            <div class="button">
                <button class="submit" type="submit" @click="submitForm">Sign up</button>
            </div>
        </div>

    </div>
</template>

<script>
    import Navigation from '@/components/Navigation.vue';
    import { URI, axios } from '@/plugins/index.js';

    export default {
        name: 'Register',
        
        data () {
            return {
                form: {
                    username: "",
                    email: "",
                    password: "",
                    repeat_password: ""
                }
            }
        },

        components: {
            Navigation,
        },

        mounted () {},

        methods: {
            async submitForm(){
                const json = JSON.stringify(this.form);
                console.log(json);

                await axios.post(`${ URI }/users/register`, json, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then((res) => {
                    if(res.status === 200) {
                        this.$router.push({ path : '/' });
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