<template>
    <span v-if="!loading">

        <Feedback v-if="saved"/>

        <AddCard @clicked="renderCard"/>

        <div v-for="card of cards" :key="card.id" >
            <div>            
                <h5>Question</h5>
                <p> {{ card.question }}</p>
            </div>

            <div>            
                <h5>Answer</h5>
                <p> {{ card.answer }}</p>
            </div>
            <hr />
        </div>

    </span>
</template>

<script>
    import { URI, axios } from '@/plugins/index.js';
    import AddCard from '@/components/AddCard.vue';
    import Feedback from '@/components/Feedback.vue';

    export default {
        name: 'Cards',
        props: ['deckId'],
        components: {
            AddCard,
            Feedback
        },


        data() {
            return {
                cards: [],
                id: localStorage.getItem('_id'),
                deck_id: this.$store.getters.deckCardsId,
                saved: false,
                loading: true
            }
        },

        mounted () {
            this.getCards();
        },

        computed: {},

        methods: {
            async getCards(){
                await axios.get( `${ URI }/cards/${ this.id }`, {
                    headers: { Authorization: `Bearer ${ localStorage.getItem('token') }` }
                    })
                    .then(response => {
                        this.cards = response.data;
                        this.loading = false;
                    })
                    .catch(err => { console.log(err) })
            },

            renderCard(event){
                console.log(event.question)
                let card = {
                    question: event.question,
                    answer: event.answer,
                    img_url: event.img_url
                }
                this.cards.push(card);
                this.feedback();
            },

            //  REQUEST FEEDBACK 
            feedback(){
                this.saved = true;
                let counter = 3;
                const timer = setInterval(() => {
                    counter--;
                    if (counter === 0) {
                        clearInterval(timer);
                        this.saved = false
                    }
                }, 1000);
            }
        },
    }
</script>

<style scoped lang="scss"></style>
