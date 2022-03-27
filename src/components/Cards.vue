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
                        <p  @click="revealCollapse" :id="card._id">Collapse</p>
                        <div class="collapse-belong" >
                            <span v-for="deck of decks" :key="deck.deck_id" >
                                <input type="checkbox" :id="deck.deck_id" @click="cardToDeck(card._id)"/>
                                {{deck.name}}
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
                collapse: false
            }
        },

        mounted () {
            this.getCards();
        },

        computed: {},

        methods: {
            revealCollapse(){
                let display = event.target.nextElementSibling.style.display;
                (display == '') ? event.target.nextElementSibling.style.display= 'flex' : 
                    event.target.nextElementSibling.style.display= '';
            },
            
            async cardToDeck(_id){
                console.log(event.target)
                console.log(event.target.id)
                console.log(_id)

                const json = JSON.stringify({
                    deck_id: event.target.id,
                    card_id: _id
                });

                await axios.put(`${ URI }/cards/add-to-deck/${ this.id }`, json, {
                    headers: {
                        Authorization: `Bearer ${ localStorage.getItem('token') }`,
                        'Content-Type': 'application/json'
                    }
                })
                .then((res) => {
                    if(res.status === 200) {
                        console.log(res)
                    }
                })
                .catch((error) => {
                    [this.form.question, this.form.answer] = '';
                    if (error) this.formError = "Email or password invalid"
                });
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

<style scoped lang="scss">
    .collapse-belong{
        display: none;
        position: absolute;
        flex-direction: column;
        background-color: aquamarine;
    }
</style>
