<template>
    <el-form class="adding-form">

        <div class="">
            <h4>New deck</h4>
        </div>

        <div class="">
            <form>
                <el-input type="text" name="" v-model="form.name" required placeholder="Name" />
                <p class="">{{ this.nameError }}</p>

                <el-select v-model="form.category">
                    <el-option disabled>Pick a category</el-option>
                    <el-option v-for="category of categories" :key="category"> {{ category }}</el-option>
                </el-select>
                <p class="">{{ this.categoryError }}</p>
            </form>

            <div class="btns-modal-form">
                <button @click="$emit('close')">Cancel</button>
                <button type="submit" @click="submitDeck">Add deck</button>
            </div>
        </div>

    </el-form>
</template>

<script>
    import { URI, axios } from '@/plugins/index.js';

    export default {
        name: 'AddDeck',
        
        data () {
            return {
                form: {
                    name: "",
                    category: "",
                },
                categories: ['Language', 'Mathematics', 'Science', 'History', 'Geography', 'Literature', 'Culture', 'Other'],
                nameError: "",
                categoryError: "",
            }
        },

        mounted () {},

        methods: {
            // SUBMIT DECK FORM
            async submitDeck(){
                const json = JSON.stringify(this.form);

                if (this.form.name.length < 6 || this.form.name.length > 31) this.nameError = 'Name must be between 6 and 30 characters';
                else if (this.form.category.length == ' ') this.categoryError = 'Pick a category';
                else {
                    await axios.post(`${ URI }/decks/${ localStorage.getItem('_id') }`, json, {
                        headers: {
                            Authorization: `Bearer ${ localStorage.getItem('token') }`,
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((res) => {
                        if(res.status === 200) {
                            [this.form.name, this.form.category] = '';
                            let arr = JSON.parse(localStorage.getItem('own_ids'));
                            arr.push(res.data.deckCards.deck_id);
                            localStorage.setItem('own_ids', JSON.stringify(arr));
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


<style lang="scss">
    .adding-form{
        position: absolute;
        z-index: 88;
        right: 0;
        background-color: #FFF;
        border: 1px solid #DDD;
    }

    .btns-modal-form{
        display: flex;
        width: 300px;

        & > *{
            width: 100%;
            border-width: 0px;
            height: 40px;
            text-align: left;
            padding: 0.5rem 0 1.7rem 0.5rem;
            cursor: pointer;
        }

        & :nth-child(1){
            background-color: #333;
            color: #fff;

            &:hover{
                opacity: .85
            }
            &:focus{
                border-color: red;
            }
        }

        & :nth-child(2){
            background-color: #0079c2;
            color: #fff;

            &:hover{
                opacity: .85
            }
            &:focus{
                border-color: red;
            }
        }

    }

</style>