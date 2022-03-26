<template>

        <div>
            <div>
                <p>add card</p>
                <form>
                    <input type="text" v-model="form.question" />
                    <input type="text" v-model="form.answer" />
                </form>
                <div>
                    <button type="submit" @click="submitForm">add card</button>
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
                    img_url: ''
                }
            }
        },

        components: {},

        mounted () {

        },

        computed: {},

        methods: {
            async submitForm(){
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
                        this.$emit('clicked', res.data);
                    }
                })
                .catch((error) => {
                    [this.form.question, this.form.answer] = '';
                    if (error) this.formError = "Email or password invalid"
                });
            },   
        },
    }
</script>

<style scoped lang="scss"></style>
