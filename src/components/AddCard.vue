<template>

        <div>
            <div>
                <p>add card</p>
                <form>
                    <input type="text" v-model="form.question" @keyup="capitalize(form.question)"/>
                    <input type="text" v-model="form.answer" @keyup="capitalize(form.answer)"/>
                    <input type="file" id="file-input-card" name="card-img" accept="image/png, image/jpeg" @change="handleFileChange($event)">

                </form>
                <div>
                    <button type="submit" @click="upload">add card</button>
                </div>
            </div>
        </div>

</template>

<script>
    import { URI, axios } from '@/plugins/index.js';

    export default {
        name: 'AddCard',

        data() {
            return {
                form: {
                    question: '',
                    answer: '',
                    img_url: '',
                },
                errors: [],
                file: null,
                cloudName: "deedfk00w",
                fileContents: null,
                formData: null
            }
        },

        components: {},

        mounted () {

        },

        computed: {},

        methods: {

            capitalize(_input){
                event.target.value = _input.charAt(0).toUpperCase() + _input.slice(1).toLowerCase();
            },

            // function to handle file info obtained from local
            // file system and set the file state
            handleFileChange: function(event) {
                //returns an array of files even though multiple not used
                this.file = event.target.files[0];
            },

            prepareFormData: function() {
                this.formData = new FormData();
                this.formData.append("upload_preset", "kram-upload");
                this.formData.append("file", this.fileContents);
            },

            async upload() {
                if(!this.file) this.createCard();
                let results;
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
                        .then(async response => {
                            results = await response.data.secure_url;
                            this.form.img_url = results;
                            this.createCard();
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
                return await results;
            },

            async createCard(){
                const json = JSON.stringify(this.form);

                await axios.post(`${ URI }/cards/${ localStorage.getItem('_id') }`, json, {
                    headers: {
                        Authorization: `Bearer ${ localStorage.getItem('token') }`,
                        'Content-Type': 'application/json'
                    }
                })
                .then((res) => {
                    if(res.status === 200) {
                        [this.form.question, this.form.answer] = '';
                        document.getElementById('file-input-card').value = '';
                        this.$emit('clicked', res.data);
                    }
                })
                .catch((error) => {
                    [this.form.question, this.form.answer] = '';
                    if (error) this.formError = "Question or answer format invalid invalid"
                });
            }
        },
    }
</script>

<style scoped lang="scss"></style>
