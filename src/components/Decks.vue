<template>

    <div v-for="deck of decks" :key="deck.id">
        <p>             
            <router-link :to="{ name:'Review', params:{ deckId: deck._id }}"> {{ deck.name }} </router-link>
            {{ deck.category }} 
        </p>
        <hr />
    </div>


</template>

<script>
    import { URI, axios } from '@/plugins/index.js';

    export default {
        name: 'Decks',

        data() {
            return {
                decks: [],
                id: sessionStorage.getItem('_id'),
            }
        },

        components: {},

        mounted () {
            this.getDecks();
        },

        computed: {},

        methods: {
            async getDecks(){
                let token;

                await axios.get(`${ URI }/users/session/${ this.id }`)
                    .then((res) => { 
                        if(res.status === 200) { 
                            token = res.data.token; 
                        }
                    })

                await axios.get( `${ URI }/decks/${ this.id }`, {
                    headers: { Authorization: `Bearer ${ token }` }
                    })
                    .then(response => {
                        this.decks = response.data;
                    })
                    .catch(err => { console.log(err) })
            }
        },

    }
</script>


<style lang="scss">
</style>
