<template>
    <Feedback v-if="saved" />
    <span v-if="!loading">
        <div v-for="deck of decks" :key="deck._id">
            {{deck.name}}

            {{deck.category}}

            {{deck.description}}

            <button @click="vote(deck.index, 'up')" id="up" 
                :disabled="deck.voters.find(elem => elem.voter_id==this.id && elem.vote == 'up')">
                upvote
            </button>

            <button @click="vote(deck.index, 'down')" id='down'
                :disabled="deck.voters.find(elem => elem.voter_id==this.id && elem.vote == 'down')">
                downvote
            </button>

            <p>{{deck.votes}}</p>

            <button @click="addDeck(deck._id)" :disabled="owned.find(elem => elem ==deck._id)">add</button>

            <hr />
        </div>
    </span>
</template>

<script>
    import { URI, axios } from '@/plugins/index.js';
    import Feedback from '@/components/Feedback.vue';

    export default {
        name: 'Repository',
        props: ['query'],

        data() {
            return {
                loading: true,
                id: localStorage.getItem('_id'),
                decks: [],
                owned: [],
                saved: false
            }
        },

        components: {
            Feedback
        },

        mounted () {
            this.getDecks()
        },

        computed: {},

        beforeUpdate(){
            if (this.$props.query.length != 0) this.decks = this.$props.query;
        },

        methods: {
            async getDecks(){    
                if (!localStorage.getItem('token')) {
                    this.$router.push({ path : `/` });
                } else {
                    await axios.get( `${ URI }/decks/repository/${ this.id }`, {
                        headers: { Authorization: `Bearer ${ localStorage.getItem('token') }` }
                    })
                    .then(async response => {
                        this.decks = await response.data;
                        this.loading = false;

                        let i = 0;
                        this.decks.forEach(deck => deck.index = i++);
                        this.owned = JSON.parse(localStorage.own_ids);
                    })
                    .catch(err => { console.log(err) })
                }
            },

            async addDeck(_id){
                let json = JSON.stringify({ 
                    deck_id: _id, ids: this.owned 
                });

                await axios.put(`${ URI }/decks/add/${ this.id }`, json, {
                headers: {
                        Authorization: `Bearer ${ localStorage.getItem('token') }`,
                        'Content-Type': 'application/json'
                    }
                })
                .then((res) => {
                    if(res.status === 200) {
                        let arr = JSON.parse(localStorage.getItem('own_ids'));
                        arr.push(res.data.deckCards._id);
                        localStorage.setItem('own_ids', JSON.stringify(arr));
                        this.addBtn(res.data.deckCards._id)
                        this.saved = true;
                        let counter = 2;
                        const timer = setInterval(() => {
                            counter--;
                            if (counter === 0) {
                                clearInterval(timer);
                                this.saved = false
                            }
                        }, 1000);
                    }
                })
                .catch((error) => {
                    console.log(error)
                });
            },

            addBtn(_id){
                this.owned.push(_id);
            },

            async vote(_index, _vote){
                let json;
                if(_vote == 'up'){
                    json = JSON.stringify({ 
                        deck_id: this.decks[_index]._id,
                        votes: this.decks[_index].votes += 1,
                        vote: this.decks[_index].voters[0].vote = 'up'
                    });

                    this.decks[_index].voters.find(elem => {
                        if (elem.voter_id == this.id){
                            elem.vote = 'up';
                        }else{
                            this.decks[_index].voters[0].voter_id = this.id;
                            elem.vote = 'up';
                        }
                    })
                }
                else if(_vote == 'down'){
                    json = JSON.stringify({ 
                        deck_id: this.decks[_index]._id,
                        votes: this.decks[_index].votes -= 1,
                        vote: this.decks[_index].voters[0].vote = 'down'
                    });

                    this.decks[_index].voters.find(elem => {
                        if (elem.voter_id == this.id){
                            elem.vote = 'down';
                        }else{
                            this.decks[_index].voters[0].voter_id = this.id;
                            elem.vote = 'down';
                        }
                    })
                }

                await axios.put(`${ URI }/decks/vote/${ this.id }`, json, {
                headers: {
                        Authorization: `Bearer ${ localStorage.getItem('token') }`,
                        'Content-Type': 'application/json'
                    }
                })
                .then((res) => {
                    if(res.status === 200) {
                        this.saved = true;
                        let counter = 2;
                        const timer = setInterval(() => {
                            counter--;
                            if (counter === 0) {
                                clearInterval(timer);
                                this.saved = false
                            }
                        }, 1000);
                    }
                })
                .catch((error) => {
                    console.log(error)
                });
            }
        },
    }
</script>


<style scoped lang="scss">


</style>
