<template>
    <Navigation/>

    <div class="" id="cards_index" @keydown="cardReview()" tabindex="0">

        <h1>Review Page</h1>
        <hr/>

        <div id="review_box" v-if="!loading">
            <div id="card_question">            
                <h5>Question</h5>
                <p> {{ cards[card_index].question }}</p>
            </div>

            <div id="card_answer">            
                <h5>Answer</h5>
                <p  v-if="reveal"> {{ cards[card_index].answer }}</p>
                <p  v-if="!reveal" style="color: transparent"> {{ cards[card_index].answer }}</p>
            </div>
        </div>
        <hr/>

        <p style="color: #888888" v-if="!reveal">Press 'spacebar' to revel answer</p>
        <button style="color: red" v-if="reveal">Fail: left arrow</button>
        <button style="color: green" v-if="reveal" >Pass: right arrow</button>
    </div>

</template>

<script>
    import Navigation from '@/components/Navigation.vue';
    import { URI, axios } from '@/plugins/index.js';
    import { spacedRepetition } from '@/plugins/spaced_repetition.js';

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
                card_index: null,
                finished: false,
                cardIds: [],
                session_length: null,
                feedback: null
            }
        },

        components: {
            Navigation,
        },

        mounted () {
            this.getDeckCards();
        },

        computed: {},

        methods: {

            // ------------------------------ GET DECK DATA
            async getDeckCards(){
                const json = JSON.stringify({ deck_id: this.deck_id});

                await axios.get(`${ URI }/users/session/${ this.id }`)
                    .then((res) => { 
                        if(res.status === 200) { this.token = res.data.token; }

                        axios.post( `${ URI }/cards/deck/${ this.id }`,  json, {
                            headers: { 
                                    'Authorization': `Bearer ${ this.token }`,
                                    'Content-Type': 'application/json'
                                }
                            })
                            .then(async (res) => { 
                                this.cards = res.data.userDeck.cards; 
                                this.loading = false;

                                this.session_length = res.data.userDeck.cards.length -1;

                                for(let i = 0; i <= this.session_length ; i++){
                                    this.cardIds.push(i)
                                }

                                this.shuffleArray(this.cardIds)
                                this.card_index =  this.cardIds.shift();
                            })
                })
                .catch(err => { console.log(err) });
            },
            
            shuffleArray(_array) {
                for (let i = _array.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [_array[i], _array[j]] = [_array[j], _array[i]];
                }
            },

            // ------------------------------ REVIEW SESSION
            cardReview(){

                if(!this.reveal && event.key == " ") {
                    this.reveal = !this.reveal;
                } else if (this.reveal && event.key == "ArrowRight" || this.reveal && event.key == "ArrowLeft" ) {
                    
                    this.cards[this.card_index] = spacedRepetition(this.cards[this.card_index], event.key)

                    if(this.cardIds.length > 0){
                        this.reveal = !this.reveal;
                        this.card_index =  this.cardIds.shift();
                    }   

                    if(this.cardIds.length == 0 && this.reveal == true){
                        let id = this.id;
                        let token = this.token;

                        let cards = this.cards.map( card => {
                            let item = {
                                card_id: card.card_id,
                                next_session: card.next_session,
                                interval: card.interval,
                                fail_counter: card.fail_counter,
                                old_ease_factor: card.old_ease_factor,
                                ease_factor: card.ease_factor,
                                success_streak: card.success_streak,
                                style_id: card.style_id,
                            }
                            return item
                        });

                        const json = JSON.stringify({ cards: cards });
                        
                        ( async function (){
                                axios.put( `${ URI }/cards/review-session/${ id }`,  json, {
                                headers: { 
                                        'Authorization': `Bearer ${ token }`,
                                        'Content-Type': 'application/json'
                                    }
                                })
                                .then((res) => { 
                                    console.log(res.status)
                                })
                            .catch(err => { console.log(err) })
                        })();
                        this.$router.push({ path : `/kram` });
                    }
                } else { null }
            },
        },

        props: {}
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
