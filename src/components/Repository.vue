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

            <button @click="addDeck(deck._id)" v-if="deck._id != owned.find(element => element == deck._id)">add</button>

            <hr />
        </div>
    </span>
</template>

<script>
    import { URI, axios } from '@/plugins/index.js';
    import Feedback from '@/components/Feedback.vue';

    export default {
        name: 'Repository',

        data() {
            return {
                loading: true,
                id: localStorage.getItem('_id'),
                token: null,
                decks: [],
                owned: JSON.parse(localStorage.own_ids),
                saved: false,
            }
        },

        components: {
            Feedback
        },

        mounted () {
            this.getDecks()
        },

        computed: {},

        methods: {
            async getDecks(){              
                await axios.get(`${ URI }/users/session/${ this.id }`)
                .then(async (res) => { 
                        this.token = res.data.token;
                        await axios.get( `${ URI }/decks/repository/${ this.id }`, {
                            headers: { Authorization: `Bearer ${ this.token }` }
                        })
                        .then(async response => {
                            this.decks = await response.data;
                            this.loading = false;

                            let i = 0;
                            this.decks.forEach(deck => deck.index = i++);
                        })
                        .catch(err => { console.log(err) })
                })
                .catch(err => { console.log(err) })
            },

            async addDeck(_id){
                let json = JSON.stringify({ 
                    deck_id: _id, ids: this.owned 
                });

                axios.put(`${ URI }/decks/add/${ this.id }`, json, {
                headers: {
                        Authorization: `Bearer ${ this.token }`,
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
            },

            vote(_index, _vote){
                if(_vote == 'up'){
                    ++this.decks[_index].votes;
                    this.decks[_index].voters.find(elem => {
                        if(elem.voter_id == this.id) elem.vote = 'up';
                    });
                }
                else if(_vote == 'down'){
                    --this.decks[_index].votes;
                    this.decks[_index].voters.find(elem => {
                        if(elem.voter_id == this.id) elem.vote = 'down';
                    });
                }

                let json = JSON.stringify({ 
                    deck_id: this.decks[_index]._id,
                    votes: this.decks[_index].votes,
                    vote: this.decks[_index].voters[0].vote
                });
                
                axios.put(`${ URI }/decks/vote/${ this.id }`, json, {
                headers: {
                        Authorization: `Bearer ${ this.token }`,
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
