<template>
    <Navigation/>

    <div class="" id="cards_index">

        <h1>Review Page</h1>
        <hr/>

       <div v-for="card of cards.cards" 
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
    import axios from 'axios';
    import { URI } from '@/plugins/url.js';

    export default {
        name: 'Review',

        data() {
            return {
                cards: [],
                id: sessionStorage.getItem('_id'),
                deck_id: this.$route.params.deckId,
                token: null
            }
        },

        components: {
            Navigation,
        },

        mounted () {
            this.getDeck();
        },

        computed: {},

        methods: {
            async getDeck(){

                const json = JSON.stringify({ deck_id: this.deck_id});

                await axios.get(`${ URI }/users/session/${ this.id }`)
                    .then((res) => { 
                        if(res.status === 200) { 
                            this.token = res.data.token; 
                            console.log(json)
                            console.log(this.token)
                        }

                    axios.post( `${ URI }/cards/deck/${ this.id }`,  json,{
                        headers: { 
                                'Authorization': `Bearer ${ this.token }`,
                                'Content-Type': 'application/json'
                            }
                        })
                        .then((res) => {
                            console.log(res);
                            this.cards = res.data;

                        })
                })
                .catch(err => { console.log(err) })
            }
        },

        props: {}
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
