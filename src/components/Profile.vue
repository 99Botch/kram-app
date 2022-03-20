<template>
    <div class="hld-profile" v-if="!loading">
        <div>
            <h5>My profile</h5>
        </div>

        <div class="profile-pic">
                <div class="content-overlay">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M21.2635 2.29289C20.873 1.90237 20.2398 1.90237 19.8493 2.29289L18.9769 3.16525C17.8618 2.63254 16.4857 2.82801 15.5621 3.75165L4.95549 14.3582L10.6123 20.0151L21.2189 9.4085C22.1426 8.48486 22.338 7.1088 21.8053 5.99367L22.6777 5.12132C23.0682 4.7308 23.0682 4.09763 22.6777 3.70711L21.2635 2.29289ZM16.9955 10.8035L10.6123 17.1867L7.78392 14.3582L14.1671 7.9751L16.9955 10.8035ZM18.8138 8.98525L19.8047 7.99429C20.1953 7.60376 20.1953 6.9706 19.8047 6.58007L18.3905 5.16586C18 4.77534 17.3668 4.77534 16.9763 5.16586L15.9853 6.15683L18.8138 8.98525Z"  fill="currentColor" />
                        <path d="M2 22.9502L4.12171 15.1717L9.77817 20.8289L2 22.9502Z" fill="currentColor" />
                    </svg>

                </div>

                <img src="@/assets/User.svg"  class="content-image"/>
        </div>

        <div>
            <p class="sub-header">Profile</p>

            <form>
                <div class="error"><p v-if="usernameError">error</p></div>
                <input type="text" id="username" name="username" v-model="user.username" required><br>
                
                <div class="error"><p v-if="emailError">error</p></div>
                <input type="text" id="email" name="email" v-model="user.email" required><br>
            </form>
            
            <div>
                <!--<button class="submit" type="submit" @click="submitForm">Update</button>-->
            </div>
        </div>

        <div>
            password
        </div>

        <div>
            <!--<button @click="deleteProfile"> Delete my profile</button>-->
            delete
        </div>
    </div>
</template>

<script>
    import { URI, axios } from '@/plugins/index.js';

    export default {
        name: 'Profile',

        components: {
        },

        data () {
            return {
                loading: true,
                id: sessionStorage.getItem("_id"),
                user: [],
                usernameError: true,
                emailError: true
            }
        },

        mounted () {
            this.getUser();
        },

        methods: {
            getUser(){
                axios.get( `${ URI }/users/${ this.id }` )
                    .then(response => {
                        this.user = {
                            username: response.data.username,
                            email: response.data.email,
                        }
                        this.loading = !this.loading;
                    })
                    .catch(error => {
                        console.log(error)
                        console.log(error.response.data)
                    })
            },
            
            async deleteProfile(){
                await axios.get(`${ URI }/users/session/${ this.id }`)
                    .then((res) => { 
                        if(res.status === 200) { 
                            this.token = res.data.token; 

                            axios.delete(`${ URI }/users/${ this.id }`, {
                                headers: {
                                        Authorization: `Bearer ${this.token}`,
                                        'Content-Type': 'application/json'
                                    }
                                })
                                .then((res) => {
                                    if(res.status === 200) {
                                        axios.delete(`${ URI }/users/logout/${ this.id }`, {
                                            headers: {
                                                    Authorization: `Bearer ${this.token}`,
                                                    'Content-Type': 'application/json'
                                                }
                                            })
                                            .then((res) => {
                                                if(res.status === 200) {
                                                    sessionStorage.removeItem('_id');
                                                    this.token = null;
                                                    this.id = null;
                                                    this.$router.push({ path : '/' });
                                                }
                                            })
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

<style scoped lang="scss">

    .hld-profile{
        h5{
            padding: 10px 15px;
            border-bottom: 1px solid #DDD;
        }

        div:nth-child(n+3){
            padding: 10px 15px;
        }

        .profile-pic{
            position: relative;
            width: 100px;
            height: 100px;
            cursor: pointer;
            margin: 15px;

            .content-overlay {
                background: rgba(0,0,0,0.7);
                position: absolute;
                left: 0;
                top: 0;
                bottom: 0;
                right: 0;
                opacity: 0;
                display: flex;
                justify-content: center;
                align-items: center;
            }

            &:hover .content-overlay{
                opacity: .75;
                border-radius: 50%;
            }

            svg{
                color: white
            }
        }

        .content-image{
            width: 100%;
            height: 100%;
        }

        .profile-pic img{
            border-radius: 50%;
            border: 1px solid #2223;
            cursor: pointer;
        }
    }

    .sub-header{
        padding-bottom: 30px;
    }

    form{
        width: 250px;
        
        input{
            width: 100%;
            border-width: 0px;
            outline: 0;
            font-size: 16px;
        }

        input:focus{
            border-bottom: 1px solid pink;
        }

        .error{
            padding-bottom: 5px;
            font-size: 12px;
            color: #DB3C3A;
        }
    }

    @media (max-width: 480px) {

    }

    @media (min-width: 480px) {

    }

</style>
