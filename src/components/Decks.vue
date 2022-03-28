<template>

    <Feedback v-if="saved"/>
    
    <div class="holder" >
        <div class="holder-btn ">
            <span class="animated-hover">
                <button @click="popForm('AddDeck')">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
                        <path d="M12 4C11.4477 4 11 4.44772 11 5V11H5C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13H11V19C11 19.5523 11.4477 20 12 20C12.5523 20 13 19.5523 13 19V13H19C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11H13V5C13 4.44772 12.5523 4 12 4Z"
                            fill="currentColor" />
                    </svg>
                    New deck
                </button>
            </span>
            <button class="sort-decks">
                Sort by
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.34317 7.75732L4.92896 9.17154L12 16.2426L19.0711 9.17157L17.6569 7.75735L12 13.4142L6.34317 7.75732Z" fill="currentColor" />
                </svg>
            </button>
            <AddDeck @clicked="renderDeck" @close="closePop" v-if="formAddDeck" />
        </div>

        <p v-if="!decks.length && !loading" class="empty-msg" >
                /W You don't have any deck as of yet ! Click the 'new deck' button or get one from our Kram community
        </p>
        
        <div class="holder-decks" v-if="!loading">
            <div v-for="deck of decks" :key="deck._id" class="holder-deck">
                <span>
                    <p class="holder-decks-name" :class="(deck.name.length > 25) ? 'overflow-name': null ">{{ deck.name }} </p>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" @click="popMenu(deck)">
                        <path d="M22 18.0048C22 18.5544 21.5544 19 21.0048 19H12.9952C12.4456 19 12 18.5544 12 18.0048C12 17.4552 12.4456 17.0096 12.9952 17.0096H21.0048C21.5544 17.0096 22 17.4552 22 18.0048Z" fill="currentColor" /><path d="M22 12.0002C22 12.5499 21.5544 12.9954 21.0048 12.9954H2.99519C2.44556 12.9954 2 12.5499 2 12.0002C2 11.4506 2.44556 11.0051 2.99519 11.0051H21.0048C21.5544 11.0051 22 11.4506 22 12.0002Z" fill="currentColor" /><path d="M21.0048 6.99039C21.5544 6.99039 22 6.54482 22 5.99519C22 5.44556 21.5544 5 21.0048 5H8.99519C8.44556 5 8 5.44556 8 5.99519C8 6.54482 8.44556 6.99039 8.99519 6.99039H21.0048Z" fill="currentColor" />
                     </svg>  
                </span>

                <p class="holder-decks-category">{{ deck.category }} </p>
                
                <p class="holder-decks-count" title="Number of cards in this deck">100 cards</p>

                <router-link :to="{ name:'Review', params:{ deckId: deck._id }}"><button :disabled="deck.card_count == 0">Review</button></router-link>
            </div>
        </div>
    </div>

    <PopDeck v-if="popMenuDeck" 
        :deck="this.popMenuDeck" 
        @clicked="popMenu" 
        @deletion="deleteDeck"
        @cards="switchPage"
        @update-deck="updateDeck"
    />

</template>

<script>
    import { URI, axios } from '@/plugins/index.js';
    import AddDeck from '@/components/AddDeck.vue';
    import Feedback from '@/components/Feedback.vue';
    import PopDeck from '@/components/PopDeck.vue';

    export default {
        name: 'Decks',
        emits: ['clicked'],

        data() {
            return {
                decks: [],
                id: localStorage.getItem('_id'),
                saved: false,
                formAddDeck: false,
                loading: true,
                popMenuDeck: false,
            }
        },

        components: {
            AddDeck,
            Feedback,
            PopDeck,
        },

        mounted () {
            this.getDecks();
        },

        computed: {},

        methods: {

            popMenu(_deck){
                (!this.popMenuDeck) ? this.popMenuDeck = {deck: JSON.parse(JSON.stringify(_deck)) } : this.popMenuDeck = false;
            },

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

            switchPage(event){
                this.$emit('clicked', event);
            },

            updateDeck(_form, _index){
                this.feedback();
                this.decks[_index].name = _form.name;
                this.decks[_index].category = _form.category;
                this.decks[_index].desctiption = _form.desctiption;
                this.decks[_index].private = _form.private;
            },

            async getDecks(){
                if (!localStorage.getItem('token')) {
                    this.$router.push({ path : `/` });
                } else {
                    await axios.get( `${ URI }/decks/${ this.id }`, {
                        headers: { Authorization: `Bearer ${ localStorage.getItem('token') }` }
                    })
                    .then(async response => {
                        this.decks = await response.data;
                        let i = 0;
                        this.loading = false;
                        this.decks.forEach(deck => deck.index = i++)
                    })
                    .catch(err => { console.log(err) })
                }

            },

            // DELETE DECK
            async deleteDeck(_id, _index){
                let isExecuted = confirm("Hey! Are you sure you want to delete that deck? All the information & styling will be lost forever:");
                if (isExecuted){
                    await axios.delete(`${ URI }/decks/${ this.id }/${ _id }`,  { headers: { Authorization: `Bearer ${ localStorage.getItem('token') }` } })
                    .then(async() => { 
                        this.popMenuDeck = false;

                        let arr = JSON.parse(localStorage.getItem('own_ids'));
                        let filtered = arr.filter(id => id != _id)
                        localStorage.setItem('own_ids', JSON.stringify(filtered));

                        this.decks.splice(_index, 1);
                        this.feedback();
                    })
                    .catch(err => { console.log(err.request) })
                }
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

    .sort-decks{
        text-transform: uppercase;
        position: relative;
        padding-bottom: 8px;

        &:hover, &:focus{
            color: #29ab87;
        }
    }

    .holder{
        display: flex;
        flex-direction: column;

        &-btn{
            display: flex;
            button{
                cursor: pointer;
            }
        }

        &-decks{
            display: grid;
            justify-content: center;
            gap: 15px;
            margin-top: 15px;
            div{
                -webkit-box-shadow: 0px 10px 13px -7px #000000, 0px 0px 34px -7px rgba(0,0,0,0);
                box-shadow: 0px 10px 13px -7px #000000, 0px 0px 34px -7px rgba(0,0,0,0);
                border: 1px solid #2222;
                border-radius: 3px;
            }
        }
    }

    .empty-msg{
        color: #2227;
        text-align: center;
        padding: 0px 20px;
    }

    .holder-deck{
        span{
            display: flex;
            justify-content: space-between;
            padding: 15px 7px 0px 7px;
            align-items: center;

            p{
                font-size: 16px;
                text-transform: uppercase;
            }
            svg{
                width: 16px;
            }
        }

        .holder-decks-category{
            font-size: 14px;
            color: #222A;
            padding: 3px 7px 15px 7px;
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
        .empty-msg{
            padding-top: 50px;
        }

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

    .overflow-name{
        width: 24ch;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    @media (max-width: 1024px) {
        .holder{
            &-btn{
                margin: 15px 15px 5px 15px;
            }
            &-decks{
                margin: 0px 15px;
            }
        }
    }

    @media (min-width: 1024px) {
        .holder{
            margin: 25px;
            &-btn{
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

    button{
        cursor: pointer;
        display: flex;
        border: 0px;
        background-color: transparent;
        font-size: 16px;
        align-items: center;
        margin-right: 15px;
    }

</style>
