<template>
    <div v-if="!loading">
        repository
    </div>
</template>

<script>
    import { URI, axios } from '@/plugins/index.js';

    export default {
        name: 'Repository',

        data() {
            return {
                loading: true,
                id: localStorage.getItem('_id'),
                token: null,
                decks: [],
            }
        },

        components: {

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
                            let i = 0;
                            this.loading = false;
                            this.decks.forEach(deck => deck.index = i++)
                        })
                        .catch(err => { console.log(err) })
                })
                .catch(err => { console.log(err) })
            }
        },
    }
</script>


<style scoped lang="scss">


</style>
