<template>
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

</template>

<script>
    import { URI, axios } from '@/plugins/index.js';

    export default {
        name: 'Cards',
        props: ['deckId'],

        data() {
            return {
                cards: [],
                id: localStorage.getItem('_id'),
                deck_id: this.$store.getters.deckCardsId,
            }
        },

        components: {},

        mounted () {
            this.getCards();
        },

        computed: {},

        methods: {
            async getCards(){
                let token;
                // console.log(token)

                await axios.get(`${ URI }/users/session/${ this.id }`)
                    .then((res) => { 
                        if(res.status === 200) { 
                            token = res.data.token; 
                        }
                    })

                await axios.get( `${ URI }/cards/${ this.id }`, {
                    headers: { Authorization: `Bearer ${ token }` }
                    })
                    .then(response => {
                        this.cards = response.data;
                    })
                    .catch(err => { console.log(err) })
            }
        },
    }
</script>

<style scoped lang="scss"></style>
