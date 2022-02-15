<template>
    <div class="" id="login">

        <p>Update form</p>

        <div>
            <form>        
                <label for="username">Username:</label><br>
                <input type="text" id="username" name="username" v-model="form.username" required><br>
                <br>

                <label for="email">Email:</label><br>
                <input type="text" id="email" name="email" v-model="form.email" required><br>
                <br>
            </form>
            
            <div class="button">
                <button class="submit" type="submit" @click="submitForm">Update</button>
            </div>
        </div>

    </div>
</template>

<script>
    import axios from 'axios';
    import { URI } from '@/plugins/url.js';

    export default {
        name: 'EditUser',
        
        data () {
            return {
                id: this.$route.params.id,
                form: {
                    username: "",
                    email: ""
                }
            }
        },

        mounted () {
            this.getUser();
        },

        methods: {
                async getUser(){
                await axios.get( `${ URI }/users/${ this.id }` )
                    .then(response => {
                        // this.user = {
                        //     username: response.data.username,
                        //     email: response.data.email,
                        // }
                        this.form.username = response.data.username;
                        this.form.email = response.data.email;
                    })
                    .catch(error => {
                        console.log(error)
                        console.log(error.response.data)
                    })
            },

            async submitForm(){

                // const json = JSON.stringify(this.form);
                // console.log(json);

                // await axios.post(`${ URI }/users/login`, json, {
                //     headers: {
                //         'Content-Type': 'application/json'
                //     }
                // })
                // .then((res) => {
                //     if(res.status === 200) {
                //         sessionStorage.setItem('_id', res.data.user_id);
                //          this.$router.push({ path : `/users/${ this.id }` });
                //     }
                // })
                // .catch((error) => {
                //     console.log(error);
                // });
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>