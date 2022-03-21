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

        <div class="forms">
            <p class="sub-header">Profile</p>

            <form class="profile-upd">
                <input type="text" id="username" name="username" v-model="user.username" required @focus="btnSub" class="profileSubmission"/>
                <input type="text" id="email" name="email" v-model="user.email" required @focus="btnSub" class="profileSubmission"/>
            </form>
            
            <div>
                <p class="error">{{ this.profileError }}</p>
                <button class="submit submit-profile" type="submit" @click="submitProfile" id="submitProfile" disabled>Update</button>
            </div>
        </div>

        <div class="forms">
            <p class="sub-header">Password</p>

            <form class="password-upd">
                <input type="password" id="username" name="pass" v-model="user.new_password" required @focus="btnSub" @blur="checkPass" placeholder="password" class="passSubmission"/>
                <input type="password" id="email" name="re" v-model="user.repeat_password" required @focus="btnSub" @blur="checkRePass" placeholder="password" class="passSubmission"/>
                <input type="password" id="email" name="re" v-model="user.old_password" required @focus="btnSub" placeholder="password" class="passSubmission"/>
            </form>
            
            <div>
                <p class="error">{{ this.passError }}</p>
                <button class="submit submit-profile" type="submit" @click="submitPass" id="submitPass" disabled>Change password</button>
            </div>
        </div>

        <div class="forms">
            <!--<button @click="deleteProfile"> Delete my profile</button>-->
            delete
        </div>

    </div>
</template>

<script>
    import { URI, axios, validator } from '@/plugins/index.js';

    export default {
        name: 'Profile',

        data () {
            return {
                loading: true,
                id: sessionStorage.getItem("_id"),
                token: '',
                user: [],
                profileError: "",
                passError: "",
            }
        },

        mounted () {
            this.getUser();
        },

        methods: {
            async getUser(){

                await axios.get(`${ URI }/users/session/${ this.id }`)
                    .then((res) => { 
                        if(res.status === 200) { 
                            this.token = res.data.token; 
                        }
                    })

                await axios.get( `${ URI }/users/${ this.id }` , {
                    headers: { Authorization: `Bearer ${ this.token }` }
                    })
                    .then(response => {
                        this.user = {
                            username: response.data.username,
                            email: response.data.email,
                            current_password: response.data.password,
                        }
                        this.loading = !this.loading;
                    })
                    .catch(error => {
                        console.log(error.response.data)
                    })
            },

            // SUBMIT FORM PROFILE UPDATE VALIDATION RULES
            btnSub(){
                if(event.target.classList.value == 'profileSubmission') document.getElementById("submitProfile").disabled = false;
                if(event.target.classList.value == 'passSubmission') document.getElementById("submitPass").disabled = false;
            },

            // SUBMIT FORM PROFILE UPDATE
            async submitProfile(){

                const json = JSON.stringify({
                    username: this.user.username,
                    email: this.user.email
                });

                if(this.user.username.length == 0 || this.user.email.length == 0) this.profileError = "Username and email can't be empty";                
                else if (this.user.username.length < 6) this.profileError = "Username must be 6 characters minimum";                
                else if(!validator.validate(this.user.email)) this.profileError = "Ensure that you entered correct email format";
                else if (this.user.username.length > 6 && validator.validate(this.user.email)){
                    axios.put(`${ URI }/users/${ this.id }`, json, {
                        headers: {
                                authorization: `Bearer ${ this.token }`,
                                'Content-Type': 'application/json'
                            }
                        })
                        .then((res) => {
                            if(res.status === 200) {
                                document.getElementById("submitProfile").disabled = true;
                                this.profileError = '';
                            }
                        })
                        .catch((error) => {
                            if(error.response.data === 'Username or Email is already taken') this.profileError = "Username or email already taken";
                        });
                }
            },

            checkPass(){
                const REG_PATTERN = "^(?=.*[0-9])(?=.*[a-zA-ZÀ-ȕ])([a-zA-ZÀ-ȕ0-9(),-_.,@ ]+)$";
                (!this.user.new_password.match(REG_PATTERN)) ? this.passError = 'bite' : this.passError = 'none';
            },

            checkRePass(){
                (this.user.new_password !== this.user.repeat_password) ? this.passError = "Make sure both passwords match!" : this.passError = '' ;
            },

            submitPass(){
                const json = JSON.stringify({
                    new_password: this.user.new_password,
                    repeat_password: this.user.repeat_password,
                    old_password: this.user.old_password,
                    current_password: this.user.current_password
                });

                // if(error.response.data.type === 'string.pattern.base') this.passError = "Password must be 6 characters long, with minimum one lowercase &uppercase character and a number";

                if(this.user.username.length == 0 || this.user.email.length == 0) this.profileError = "Username and email can't be empty";                
                else {
                    axios.put(`${ URI }/users/password/${ this.id }`, json, {
                        headers: {
                                authorization: `Bearer ${ this.token }`,
                                'Content-Type': 'application/json'
                            }
                        })
                        .then((res) => {
                            if(res.status === 200) {
                                document.getElementById("submitProfile").disabled = true;
                                this.profileError = '';
                            }
                        })
                        .catch((error) => {
                            if(error.response.data === 'Old password is not matching database') this.passError = "Error: wrong password";
                            if(error.response.data.type === 'string.pattern.base') this.passError = "Password must be 6 characters long, with minimum one lowercase &uppercase character and a number";
                        });
                }
            },
            
            // DELETE USER PROFILE
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

        .forms{
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
        // padding-bottom: 30px;
    }

    form{
        width: 250px;
        
        input{
            width: 100%;
            border-width: 0px 0px 1px 0px;
            border-bottom-color: transparent;
            outline: 0;
            font-size: 16px;
            // padding: 5px;
        }

        input:focus{
            border-bottom: 1px solid #222F;
        }
    }
    
    .error{
        // padding-bottom: 5px;
        color: #DB3C3A;
        height: 14px;
        font-size: 14px;
    }


            // margin-bottom: 30px;
            // margin: 5px 0px 30px 0px;
        

    .submit-profile{
        border-width: 0px;
        background-color: #0079C2;
        color: #FFF;
        font-size: 16px;
        padding: 5px 10px;
        border-radius: 5px;
        cursor: pointer;

        &:disabled{
            background-color: transparent;
            cursor: auto;
        }
    }



    @media (max-width: 480px) {

    }

    @media (min-width: 480px) {

    }

</style>
