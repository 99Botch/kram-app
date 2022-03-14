<template>
    <Navigation/>

    <div class="" id="cards_index">

        <h1>Cards</h1>
        <hr/>

       <div v-for="card of cards" 
            :key="card.id"
        >

            <div>            
                <h5>Question</h5>
                <p> {{ card.question }}</p>
            </div>

            <div>            
                <h5>Answer</h5>
                <p> {{ card.answer }}</p>
            </div>
            <hr/>

        </div>
    </div>

</template>

<script>
    import Navigation from '@/components/Navigation.vue';
    import { URI, axios } from '@/plugins/index.js';

    export default {
        name: 'Cards',

        data() {
            return {
                cards: [],
                id: sessionStorage.getItem('_id'),
            }
        },

        components: {
            Navigation,
        },

        mounted () {
            this.getCards();
        },

        computed: {},

        methods: {
            async getCards(){
                let token;

                await axios.get(`${ URI }/users/session/${ this.id }`)
                    .then((res) => { 
                        if(res.status === 200) { 
                            token = res.data.token; 
                        }
                    })

                await axios.get( `${ URI }/cards/${ this.id }`, {
                    headers: { Authorization: `Bearer ${ token }` }
                    })
                    .then(response => {
                        this.cards = response.data;
                    })
                    .catch(err => { console.log(err) })
            }
        },

        props: {}
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
