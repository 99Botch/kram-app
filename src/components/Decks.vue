<template>
    <Feedback v-if="saved"/>
    

    <div class="holder">

        <div class="holder-btn">
            <button @click="popForm('AddDeck')">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
                    <path d="M12 4C11.4477 4 11 4.44772 11 5V11H5C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13H11V19C11 19.5523 11.4477 20 12 20C12.5523 20 13 19.5523 13 19V13H19C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11H13V5C13 4.44772 12.5523 4 12 4Z"
                        fill="currentColor" />
                </svg>
                New deck
            </button>
            <button>Sort by</button>
            <AddDeck @clicked="renderDeck" @close="closePop" v-if="formAddDeck" />
        </div>
        
        <div class="holder-decks" style="background-color: wheat;">
            <div v-for="deck of decks" :key="deck._id" >
                <p>             
                    <router-link :to="{ name:'Review', params:{ deckId: deck._id }}"> {{ deck.name }} </router-link>
                    {{ deck.category }} 
                </p>
                <button :id="deck._id" @click="deleteDeck(deck.index)">Delete</button>
            </div>
        </div>

    </div>
</template>

<script>
    import { URI, axios } from '@/plugins/index.js';
    import AddDeck from '@/components/AddDeck.vue';
    import Feedback from '@/components/Feedback.vue';

    export default {
        name: 'Decks',

        data() {
            return {
                decks: [],
                id: sessionStorage.getItem('_id'),
                token: null,
                saved: false,
                formAddDeck: false,
            }
        },

        components: {
            AddDeck,
            Feedback,
        },

        mounted () {
            this.getDecks();
        },

        computed: {},

        methods: {
            renderDeck(event){
                this.decks.push(event);
                this.formAddDeck= false;
                this.feedback();
            },

            popForm(event){
                if (event == 'AddDeck') [this.formAddDeck] = [true]
            },

            closePop(){
                this.formAddDeck= false;
            },

            async getDecks(){
                await axios.get(`${ URI }/users/session/${ this.id }`)
                    .then(async (res) => { 
                            this.token = res.data.token
                            await axios.get( `${ URI }/decks/${ this.id }`, {
                                headers: { Authorization: `Bearer ${ this.token }` }
                            })
                            .then(async response => {
                                this.decks = await response.data;
                                let i = 0;
                                this.decks.forEach(deck => deck.index = i++)
                            })
                            .catch(err => { console.log(err) })
                    })
                    .catch(err => { console.log(err) })
            },

            // DELETE DECK
            async deleteDeck(_index){
                let deck_id = event.target.id;
                await axios.delete(`${ URI }/decks/${ this.id }/${ deck_id }`,  { headers: { Authorization: `Bearer ${ this.token }` } })
                    .then(async() => { 
                        this.decks.splice(_index, 1);
                        this.feedback();
                    })
                    .catch(err => { console.log(err.request) })
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


<style lang="scss">
    .holder{
        display: flex;
        flex-direction: column;

        &-btn{
            button{
                cursor: pointer;
            }
        }

        &-decks{
            // margin: 0px 25px;
            display: grid;
            justify-content: center;
            gap: 15px;

            div{
                background-color: lightgreen;
            }
        }
    }

    @media (max-width: 600px) {
        .holder{
            &-decks{
                grid-template-columns: 1fr;
            }
        }
    }

    @media (min-width: 600px) {
        .holder{
            &-decks{
                grid-template-columns: repeat(3, minmax(150px, 200px));
            }
        }
    }

    @media (min-width: 768px) {
        .holder{
            &-decks{
                grid-template-columns: repeat(3, minmax(200px, 250px));
            }
        }
    }

    @media (max-width: 1024px) {
        .holder{
            &-btn{
                margin: 0px 15px;
            }
        }
    }

    @media (min-width: 1024px) {
        .holder{
            margin: 25px;
            &-btn{
                display: flex;
                button{
                    cursor: pointer;
                    padding: 15px 0px;
                    display: flex;
                    border: 0px;
                    background-color: transparent;
                    font-size: 16px;
                    align-items: center;
                    margin-right: 15px;
                }
                svg{
                    width: 16px;
                    margin-right: 3px;
                    gap: 0px
                }
            }
            &-decks{
                grid-template-columns: repeat(3, minmax(250px, 300px));
            }
        }
    }

    @media (max-height: 600px) {
        .holder{
            &-decks{
                grid-template-columns: 1fr;
            }
        }
    }
</style>
