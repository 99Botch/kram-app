<template>
    <div class="form-items">

        <div class="form-items-header">
            <h4>New deck</h4>
        </div>

        <div class="form-items-form">
            <form>
                <input type="text" name="" v-model="form.name" required placeholder="Name" />
                <p class="form-items-error">{{ this.nameError }}</p>

                <select v-model="form.category">
                    <option disabled>Pick a category</option>
                    <option v-for="category of categories" :key="category"> {{ category }}</option>
                </select>
                <p class="form-items-error">{{ this.categoryError }}</p>
            </form>

            <div class="form-items-submit">
                <button @click="$emit('close')">Cancel</button>
                <button type="submit" @click="submitForm">Add deck</button>
            </div>
        </div>



    </div>
</template>

<script>
    import { URI, axios } from '@/plugins/index.js';

    export default {
        name: 'AddDeck',
        
        data () {
            return {
                token: null,
                form: {
                    name: "",
                    category: "",
                },
                categories: ['Language', 'Mathematics', 'Science', 'History', 'Geography', 'Literature', 'Culture', 'Other'],
                nameError: "",
                categoryError: "",
            }
        },

        mounted () {
            this.getToken();
        },

        methods: {
            // GET TOKEN
            async getToken(){
                await axios.get(`${ URI }/users/session/${ localStorage.getItem('_id') }`)
                    .then((res) => { 
                        if(res.status === 200) { 
                            this.token = res.data.token; 
                        }
                    })
                    .catch(err => { console.log(err) });
            },

            // SUBMIT DECK FORM
            async submitForm(){
                const json = JSON.stringify(this.form);

                if (this.form.name.length < 6 || this.form.name.length > 31) this.nameError = 'Name must be between 6 and 30 characters';
                else if (this.form.category.length == ' ') this.categoryError = 'Pick a category';
                else {
                    await axios.post(`${ URI }/decks/${ localStorage.getItem('_id') }`, json, {
                        headers: {
                            Authorization: `Bearer ${ this.token }`,
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((res) => {
                        if(res.status === 200) {
                            [this.form.name, this.form.category] = '';
                            this.$emit('clicked', res.data.deck);
                        }
                    })
                    .catch((error) => {
                        if (error) this.formError = "Email or password invalid"
                    });
                }
            },                
        },
    }
</script>


<style scoped lang="scss">

    .form-items{
        background-color: white;
        position: absolute;
        display: flex;
        flex-direction: column;
        align-items: center;
        border-radius: 3px;
        border: 1px solid #2223;
        margin-top: 53px;
        width: 300px;

        .form-items-header{
            border-bottom: 1px solid #2222;
            width: 100%;
            text-align: center;

            h4{
                color: #222E;
                padding: 25px 0px;
            }
        }

        form{
            display: flex;
            flex-direction: column;
            width: 200px;
            padding-top: 30px;

            & input, & select {
                outline: 0;
                padding: 10px;
                background-color: white;
                border-radius: 3px;
                border-color: #2222;
            }

            & input:focus, & select:focus {
                border-color: #222C;
            }

            .form-items-error {
                color: #DB3C3A;
                font-size: 12px;
                padding: 5px 0px 15px 0px;
                height: 34px;
            }
        }

        .form-items-submit{
            width: 100%;
            display: flex;
            justify-content: space-between;
            padding: 10px 0px 30px 0px;

            button{
                padding: 10px 15px;
                font-size: 12px;
                border: 1px solid #0079C2CC;
                border-radius: 7px;
                cursor: pointer;
            }

            & :nth-child(1){
                background-color: white;
                color: #0079C2CC;

                &:hover{
                    color: #0079C2CC;
                }
            }

            & :nth-child(2){
                background-color: #0079C2CC;
                color: white;
            }
        }
    }

    @media (max-width: 480px) {
        .form-items{
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            margin: 0px;

            form{
                display: flex;
                flex-direction: column;
                width: 335px;
                padding-top: 30px;
            }
        }
    }
</style>