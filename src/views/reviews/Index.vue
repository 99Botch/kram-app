<template>
    <Navigation/>

    <div class="" id="cards_index" @keyup.space="cardReview()" tabindex="0">

        <h1>Review Page</h1>
        <hr/>

        <div id="review_box" v-if="!loading">
            <div id="card_question">            
                <h5>Question</h5>
                <p> {{ cards.cards[card_index].question }}</p>
            </div>

            <div id="card_answer">            
                <h5>Answer</h5>
                <p  v-if="reveal"> {{ cards.cards[card_index].answer }}</p>
                <p  v-if="!reveal" style="color: transparent"> {{ cards.cards[card_index].answer }}</p>
            </div>
        </div>
        <p style="color: #888888" v-if="!reveal">Press 'spacebar' to revel answer</p>
        <p style="color: #888888" v-if="reveal">Press 'spacebar' to pass on next card</p>
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
                token: null,
                loading: true,
                reveal: false,
                session_length: 0,
                card_index: null,
                finished: false,
                reviewed_card: []
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

            // ------------------------------ GET DECK DATA
            async getDeck(){

                const json = JSON.stringify({ deck_id: this.deck_id});

                await axios.get(`${ URI }/users/session/${ this.id }`)
                    .then((res) => { 
                        if(res.status === 200) { this.token = res.data.token; }
                        // console.log(res.data.token);

                    axios.post( `${ URI }/cards/deck/${ this.id }`,  json,{
                        headers: { 
                                'Authorization': `Bearer ${ this.token }`,
                                'Content-Type': 'application/json'
                            }
                        })
                        .then((res) => { 
                            this.cards = res.data; 
                            this.session_length = res.data.cards.length -1;
                            // this.card_index = Math.floor(Math.random() * (3 - 0 + 1) + 0);
                            // this.reviewed_card.push(this.card_index);
                                    this.card_index =0
                            this.loading = false;
                        })
                })
                .catch(err => { console.log(err) })
            },

            // ------------------------------ REVIEW SESSION
            cardReview(){
                if(!this.reveal) {
                    this.reveal = !this.reveal;
                } else {
                    this.cards.cards[this.card_index].review_lapse = "1d";
                    this.cards.cards[this.card_index].is_new = false;

                    // if(this.card_index < this.session_length){
                    if(this.card_index < 1000){



                // this.card_index = Math.floor(Math.random() * (3 - 0 + 1) + 0);

                        // this.reviewed_card.find(index =>{
                            // if (index != this.card_index) {
                                // this.reviewed_card.push(this.card_index)

                        this.reveal = !this.reveal;
                        this.indexGenerator();
                    }
                    
                    // if(this.card_index >= this.session_length && this.reveal == true) { 
                        // let id = this.id;
                        // let token = this.token;

                        // let cards = this.cards.cards.map( card => {
                        //     let item = {
                        //         _id: card._id,
                        //         card_id: card.card_id,
                        //         last_review: card.last_review,
                        //         review_lapse: card.review_lapse,
                        //         fail_counter: card.fail_counter,
                        //         ease_factor: card.ease_factor,
                        //         is_new: card.is_new,
                        //         style_id: card.style_id,
                        //     }
                        //     return item
                        // });

                        // const json = JSON.stringify({ 
                        //     deck_id: this.deck_id,
                        //     cards: cards
                        // });
                        
                        // ( async function (){
                        //         axios.put( `${ URI }/cards/review-session/${ id }`,  json, {
                        //         headers: { 
                        //                 'Authorization': `Bearer ${ token }`,
                        //                 'Content-Type': 'application/json'
                        //             }
                        //         })
                        //         .then((res) => { 
                        //             console.log(res.status)
                        //         })
                        //     .catch(err => { console.log(err) })
                        // })();
                        // this.$router.push({ path : `/decks` });

                    // }
                }
            },

            indexGenerator() {
                if(this.card_index >= this.session_length) {
                    console.log("end me")
                } else {
                    this.card_index ++
                    this.indexGenerator();
                }
            }
        },

        props: {}
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
