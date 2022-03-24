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
            <div v-for="deck of decks" :key="deck._id">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" @click="popMenu(deck)">
                    <path d="M8 6.9834C7.44772 6.9834 7 7.43111 7 7.9834C7 8.53568 7.44772 8.9834 8 8.9834H16C16.5523 8.9834 17 8.53568 17 7.9834C17 7.43111 16.5523 6.9834 16 6.9834H8Z" fill="currentColor" />
                    <path d="M7 12C7 11.4477 7.44772 11 8 11H16C16.5523 11 17 11.4477 17 12C17 12.5523 16.5523 13 16 13H8C7.44772 13 7 12.5523 7 12Z" fill="currentColor" />
                    <path d="M8 15.017C7.44772 15.017 7 15.4647 7 16.017C7 16.5693 7.44772 17.017 8 17.017H16C16.5523 17.017 17 16.5693 17 16.017C17 15.4647 16.5523 15.017 16 15.017H8Z" fill="currentColor" />
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12Z" fill="currentColor" />
                 </svg>  
                <p class="holder-decks-name">{{ deck.name }} </p>
                <p class="holder-decks-category">{{ deck.category }} </p>
                <p class="holder-decks-count">110 cards</p>
                <router-link :to="{ name:'Review', params:{ deckId: deck._id }}">Review</router-link>
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
                token: null,
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
                (!this.popMenuDeck) ? this.popMenuDeck = {deck: JSON.parse(JSON.stringify(_deck)), token: this.token} : this.popMenuDeck = false;
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
                this.popMenuDeck = false;
                this.feedback();
                this.decks[_index].name = _form.name;
                this.decks[_index].category = _form.category;
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
                            this.loading = false;
                            this.decks.forEach(deck => deck.index = i++)
                        })
                        .catch(err => { console.log(err) })
                })
                .catch(err => { console.log(err) })
            },

            // DELETE DECK
            async deleteDeck(_id, _index){
                await axios.delete(`${ URI }/decks/${ this.id }/${ _id }`,  { headers: { Authorization: `Bearer ${ this.token }` } })
                .then(async() => { 
                    this.popMenuDeck = false
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

    $blue: #0079C2;
    $black: #222D;
    $whitey: #f0f0f0;

    $duration: .2s;
    $distance: 8px;
    $easeOutBack: cubic-bezier(0.175, 0.885, 0.320, 1.275);

    .animated-hover {
        list-style-type: none;
        margin: 0;
        text-align: center;
        
        button {
            color: $black;
            position: relative;
            text-transform: uppercase;
            text-decoration: none;
            padding-bottom: 8px;

            &:before, &:after {
                content: '';
                position: absolute;
                bottom: 2px;
                left: 0; right: 0;
                height: 2px;
                background-color: $blue;
            }
            &:before {
                opacity: 0;
                transform: translateY(- $distance);
                transition: transform 0s $easeOutBack, opacity 0s;
            }
            &:after {
                opacity: 0;
                transform: translateY($distance/2);
                transition: transform $duration $easeOutBack, opacity $duration;
            }
            &:hover, &:focus {
                color: #0079C2;

                &:before, &:after {
                    opacity: 1;
                    transform: translateY(0);
                }
                &:before {
                    transition: transform $duration $easeOutBack, opacity $duration;
                }
                &:after {
                    transition: transform 0s $duration $easeOutBack, opacity 0s $duration;
                }
            }
        }
    }
</style>
