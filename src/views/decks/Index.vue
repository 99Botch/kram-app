<template>
    <Navigation/>

    <div class="" id="decks_index">

        <h1>My decks</h1>
        <hr/>

       <div v-for="deck of decks" 
            :key="deck.id"
        >
            <p>             
                <router-link :to="{ name:'Review', params:{ deckId: deck._id }}"> {{ deck.name }} </router-link>
                {{ deck.category }} {{ deck.sub_category }}
            </p>
            <hr/>
        </div>
    </div>

</template>

<script>
    import Navigation from '@/components/Navigation.vue';
    import axios from 'axios';
    import { URI } from '@/plugins/url.js';

    export default {
        name: 'Decks',

        data() {
            return {
                decks: [],
                id: sessionStorage.getItem('_id'),
            }
        },

        components: {
            Navigation,
        },

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

        props: {}
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
