<template>
    <span v-if="!loading">

        <Feedback v-if="saved"/>

        <AddCard @clicked="renderCard"/>

        <div>
            <div>

            </div>
            
            <table>
                <tr>
                    <th>Question</th>
                    <th>Answer</th>
                    <th>Fail Counter</th>
                    <th>Burry</th>
                    <th>Add/remove</th>
                </tr>
                <tr v-for="card of cards" :key="card.id" >
                    <td>{{ card.question }}</td>
                    <td>{{ card.answer }}</td>
                    <td>X</td>
                    <td>X</td>
                    <td>
                        <button @click="boxReveal(card._id)" :id="card._id">Collapse</button>
                        <div class="collapse-belong" v-if="revealed == card._id">
                            <span v-for="(deck, index) of decks" :key="deck.deck_id" >
                                <input type="checkbox" :id="deck.deck_id" @click="cardToDeck(card._id, index)" 
                                     :checked="deck.card_ids.find(elem => elem == card._id)"/>
                                {{ deck.name }}
                            </span>
                        </div>
                    </td>
                </tr>
            </table>
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
                decks: [],
                id: localStorage.getItem('_id'),
                deck_id: this.$store.getters.deckCardsId,
                saved: false,
                loading: true,
                revealed: false
            }
        },

        mounted () {
            this.getCards();
        },

        computed: {},

        methods: {
            boxReveal(_id){
                if(!this.revealed){
                    this.revealed = _id;
                }
                else if(this.revealed != _id){
                    this.revealed = _id;
                }
                else{
                    this.revealed = false;
                }
            },
            
            async cardToDeck(_id, _index){
                const json = JSON.stringify({
                    deck_id: event.target.id,
                    card_id: _id
                });

                if(event.target.checked){
                    this.decks[_index].card_ids.push(_id);
                } else {
                    this.decks[_index].card_ids.find( elem => {
                        if (elem == _id) this.decks[_index].card_ids.splice(this.decks[_index].card_ids.indexOf(elem), 1);
                    })
                }

                let url_one = `${ URI }/cards/add-to-deck/${ this.id }`;
                let url_two = `${ URI }/cards/deck/${ this.id }`;

                await axios.put( (event.target.checked) ? url_one : url_two, json, {
                    headers: {
                        Authorization: `Bearer ${ localStorage.getItem('token') }`,
                        'Content-Type': 'application/json'
                    }
                })
                .then((res) => {
                    if(res.status === 200) {
                        this.feedback();
                    }
                })
                .catch((error) => {console.log(error)});
            },

            async getCards(){
                const promise1 = await axios.get( `${ URI }/cards/${ this.id }`, {
                    headers: { Authorization: `Bearer ${ localStorage.getItem('token') }` }
                })

                const promise2 = await axios.get( `${ URI }/decks/table/${ this.id }`, {
                    headers: { Authorization: `Bearer ${ localStorage.getItem('token') }` }
                })

                Promise.all([promise1, promise2])
                    .then(async values => {
                        this.cards = await values[0].data;
                        this.decks = await values[1].data;
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
                let counter = 1;
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

<style scoped lang="scss">
    .collapse-belong{
        position: absolute;
        flex-direction: column;
        background-color: aquamarine;
    }
</style>
