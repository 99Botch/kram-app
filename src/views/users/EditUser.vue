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
                        this.form.username = response.data.username;
                        this.form.email = response.data.email;
                    })
                    .catch(error => {
                        console.log(error)
                        console.log(error.response.data)
                    })
            },

            async submitForm(){

                const json = JSON.stringify(this.form);

                await axios.get(`${ URI }/users/session/${ this.id }`)
                    .then((res) => { 
                        if(res.status === 200) { 
                            this.token = res.data.token; 

                            axios.put(`${ URI }/users/${ this.id }`, json, {
                                headers: {
                                        Authorization: `Bearer ${ this.token }`,
                                        'Content-Type': 'application/json'
                                    }
                                })
                                .then((res) => {
                                    if(res.status === 200) {
                                        this.token = null;
                                        this.$router.push({ path : `/users/${ this.id }` });
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>