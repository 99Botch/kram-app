<template>

    <Deletion v-if="deleteBox" :username="this.user.username" @clicked="deletion" />

    <Feedback v-if="saved"/>

    <div class="hld-profile" v-if="!loading">

        <div>
            <h5>My profile</h5>
        </div>

        <div class="profile-pic " title="Edit profile picture">
            <div class="content-overlay" @click="inputPic">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M21.2635 2.29289C20.873 1.90237 20.2398 1.90237 19.8493 2.29289L18.9769 3.16525C17.8618 2.63254 16.4857 2.82801 15.5621 3.75165L4.95549 14.3582L10.6123 20.0151L21.2189 9.4085C22.1426 8.48486 22.338 7.1088 21.8053 5.99367L22.6777 5.12132C23.0682 4.7308 23.0682 4.09763 22.6777 3.70711L21.2635 2.29289ZM16.9955 10.8035L10.6123 17.1867L7.78392 14.3582L14.1671 7.9751L16.9955 10.8035ZM18.8138 8.98525L19.8047 7.99429C20.1953 7.60376 20.1953 6.9706 19.8047 6.58007L18.3905 5.16586C18 4.77534 17.3668 4.77534 16.9763 5.16586L15.9853 6.15683L18.8138 8.98525Z"  fill="currentColor" />
                    <path d="M2 22.9502L4.12171 15.1717L9.77817 20.8289L2 22.9502Z" fill="currentColor" />
                </svg>
            </div>

            <img v-if="user.profile_pic_url" :src="user.profile_pic_url" @click="profile($event)" class="content-image" multiple />
            <img v-else src="@/assets/User.svg"  class="content-image"/>

            <input type="file" id="file-input" name="avatar" accept="image/png, image/jpeg" style="display: none;" @change="handleFileChange($event)">

        </div>

        <div class="profile-forms">
            <div class="forms">
                <p class="sub-header">Account information</p>

                <form class="profile-upd">
                    <div class="ipt-item">
                        <label for="username">Username</label>
                        <el-input type="text" id="username" name="username" v-model="user.username" required class="profileSubmission"/>
                    </div>
                    
                    <div class="ipt-item">
                        <label for="email">Mail adress</label>
                        <el-input type="text" id="email" name="email" v-model="user.email" required class="profileSubmission"/>
                    </div>
                    
                    <p class="error">{{ this.profileError }}</p>
                </form>
                
            </div>

            <div class="forms">
                <p class="sub-header">Change password</p>

                <form class="password-upd">
                    <div class="ipt-item">
                        <label for="new_password">New password</label>
                        <el-input type="password" id="new_password" name="pass" v-model="user.new_password" required @blur="checkPass" class="passSubmission"/>
                    </div>
                    
                    <div class="ipt-item" >
                        <label for="confirm_password">Confirm password</label>
                        <el-input type="password" id="confirm_password" name="re" v-model="user.repeat_password" required @blur="checkRePass" class="passSubmission"/>
                    </div>

                    <div class="ipt-item" for="username">
                        <label for="old_password">Old password</label>
                        <el-input type="password" id="old_password" name="re" v-model="user.old_password" required class="passSubmission"/>
                    </div>
                    
                    <p class="error">{{ this.passError }}</p>
                </form>
                

            </div>

            <div class="forms forms-sub-change">
                <el-button type="primary" class="submit-change" @click="submitProfile">Save Changes</el-button>
                <el-button class="warning-del" @click="deleteBox = true">Delete my profile</el-button>
            </div>
        </div>

    </div>
</template>

<script>
    import { URI, axios, validator } from '@/plugins/index.js';
    import Deletion from '@/components/Deletion.vue';
    import Feedback from '@/components/Feedback.vue';

    export default {
        name: 'Profile',

        components: {
            Deletion,
            Feedback
        },


        data () {
            return {
                loading: true,
                id: localStorage.getItem("_id"),
                user: [],
                profileError: "",
                passError: "",
                deleteBox: false,
                saved: false,
                errors: [],
                file: null,
                cloudName: "deedfk00w",
                fileContents: null,
                formData: null
            }
        },

        mounted () {
            this.getUser();
        },

        methods: {
            async inputPic(){
                document.getElementById('file-input').click();
            },

            // function to handle file info obtained from local
            // file system and set the file state
            handleFileChange: function(event) {
                //returns an array of files even though multiple not used
                this.file = event.target.files[0];
                this.upload();
            },

            prepareFormData: function() {
                this.formData = new FormData();
                this.formData.append("upload_preset", "kram-upload");
                this.formData.append("file", this.fileContents);
            },

            upload: function() {

                let reader = new FileReader();

                reader.addEventListener(
                    "load",
                    function() {
                        this.fileContents = reader.result;
                        this.prepareFormData();
                        let cloudinaryUploadURL = `https://api.cloudinary.com/v1_1/${this.cloudName}/upload`;
                        
                        let requestObj = {
                            url: cloudinaryUploadURL,
                            method: "POST",
                            data: this.formData,
                        };

                        axios(requestObj)
                            .then(response => {
                                let results = response.data.secure_url;
                                this.updUrlDB(results);
                            })
                            .catch(error => {
                                this.errors.push(error);
                                console.log(this.error);
                            })
                        }
                    .bind(this), false 
                );

                // call for file read if there is a file
                if (this.file && this.file.name) {
                    reader.readAsDataURL(this.file);
                }
            },

            updUrlDB(_results){
                let json = { 
                    profile_pic_url: _results
                };

                axios.put(`${ URI }/users/pic/${ this.id }`, json, {
                    headers: {
                            authorization: `Bearer ${ localStorage.getItem('token') }`,
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((res) => {
                        if(res.status === 200) {
                            this.user.profile_pic_url = _results;
                            this.$emit('picUrl', _results);
                            let counter = 2;
                            const timer = setInterval(() => {
                                counter--;
                                this.saved= true;
                                if (counter === 0) {
                                    clearInterval(timer);
                                    this.saved= false;
                                }
                            }, 1000);
                        }
                    })
                    .catch((error) => { console.log(error) });
            },
 
            async getUser(){
                await axios.get( `${ URI }/users/${ this.id }` , {
                    headers: { Authorization: `Bearer ${ localStorage.getItem('token') }` }
                })
                .then(res => {
                    this.user = {
                        username: res.data.username,
                        email: res.data.email,
                        current_password: res.data.password,
                        profile_pic_url: res.data.profile_pic_url
                    }
                    this.loading = !this.loading;
                })
                .catch(error => {
                    console.log(error.response.data)
                })
            },

            deletion(event){
                if (!event) {
                    console.log(true)
                    this.deleteBox = false
                } else {
                    axios.delete(`${ URI }/users/${ this.id }`, {
                        headers: {
                                Authorization: `Bearer ${ localStorage.getItem('token') }`,
                                'Content-Type': 'application/json'
                            }
                        })
                        .then((res) => {
                            if(res.status === 200) {
                                localStorage.removeItem('token');
                                localStorage.removeItem('_id');
                                localStorage.setItem('page', 'deck');
                                this.id = null;
                                this.$router.push({ path : '/' });
                            }
                        })
                        .catch((error) => {
                            console.log("error: " + error);
                        });
                }
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
                                authorization: `Bearer ${ localStorage.getItem('token') }`,
                                'Content-Type': 'application/json'
                            }
                        })
                        .then((res) => {
                            if(res.status === 200) {
                                this.profileError = '';
                                let counter = 5;

                                const timer = setInterval(() => {
                                    counter--;
                                    this.saved= true;
                                    if (counter === 0) {
                                        clearInterval(timer);
                                        this.saved= false;
                                    }
                                }, 1000);
                            }
                        })
                        .catch((error) => {
                            if(error.response.data === 'Username or Email is already taken') this.profileError = "Username or email already taken";
                        });
                }
            },

            checkPass(){
                const REG_PATTERN = "^(?=.*[0-9])(?=.*[a-zA-ZÀ-ȕ])([a-zA-ZÀ-ȕ0-9(),-_.,@ ]+)$";
                (!this.user.new_password.match(REG_PATTERN)) ? this.passError = 'Password must be 8 characters long, witn a one lowercase/uppercase character and a number' : this.passError = '';
            },

            checkRePass(){
                (this.user.new_password !== this.user.repeat_password) ? this.passError = "Both passwords must match!" : this.passError = '' ;
            },

            submitPass(){
                const json = JSON.stringify({
                    new_password: this.user.new_password,
                    repeat_password: this.user.repeat_password,
                    old_password: this.user.old_password,
                });

                if(this.user.username.length == 0 || this.user.email.length == 0) this.profileError = "Username and email can't be empty";                
                else {
                    axios.put(`${ URI }/users/password/${ this.id }`, json, {
                        headers: {
                                authorization: `Bearer ${ localStorage.getItem('token') }`,
                                'Content-Type': 'application/json'
                            }
                        })
                        .then((res) => {
                            if(res.status === 200) {
                                [this.profileError, this.user.new_password, this.user.old_password, this.user.repeat_password] = '';
                                let counter = 5;

                                const timer = setInterval(() => {
                                    counter--;
                                    this.saved= true;
                                    if (counter === 0) {
                                        clearInterval(timer);
                                        this.saved= false;
                                    }
                                }, 1000);
                            }
                        })
                        .catch((error) => {
                            if(error.response.data === 'Old password is not matching database') this.passError = "Error: wrong password";
                            if(error.response.data.type === 'string.pattern.base') this.passError = "Password must be 6 characters long, with minimum one lowercase &uppercase character and a number";
                            if(error.response.data.type === 'any.required') this.passError = "Fill in the form !";
                        });
                }
            },
        }    
    }
    
</script>

<style lang="scss">

    .hld-profile{
        h5{
            padding: 10px 15px;
            border-bottom: 1px solid #DDD;
        }

        .profile-pic{
            position: relative;
            width: 100px;
            height: 100px;
            cursor: pointer;
            margin: 30px 15px 15px 15px;

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
            object-fit: cover;
        }
    }

    .forms{
        padding-top: 25px;
    }

    .profile-forms{
        padding: 0 15px;
    }

    .sub-header{
        padding-bottom: 15px;
    }

    .el-input__inner{
            // border-radius: 0px;
            box-shadow: none !important;
            border: 1.5px solid #DDD;
                
             &:hover{
                box-shadow: none !important;
            }

            &:focus{
                box-shadow: none !important;
                border-color: #0079c2CC;
            }
    }



    .ipt-item{
        display: flex;
        align-items: center;
        padding-bottom: 15px;

        label{
            width: 16ch;
            padding-right: 2ch;
            font-size: 14px;
            color: #8a8d90;
        }

        @media (max-width: 600px) {
            label{
                font-size: 14px;
                width: 15ch;
                padding-right: 2ch;
            }
        }
    }

    .profileSubmission, .passSubmission{
        max-width: 350px;
    }
    .forms-sub-change{
        margin-bottom: 30px;
    }
    .error{
        color: #DB3C3A;
        font-size: 14px;
        height: 16px;
    }

    .warning-del, .submit-change{
        text-transform: uppercase;
        font-size: 14px;
        font-family: Arial;
        font-weight: 600;
    }

    .submit-change{
        background-color: #0079C2CC;

        &:hover{
            opacity: .7;
        }
    }

    .warning-del{
        color: #DB3C3ACC;
        border-color: #DB3C3ACC;
        background-color: #DB3C3A11;

        &:hover{
            color: #DB3C3A;
            border-color: #DB3C3A;
        }
    }

</style>
