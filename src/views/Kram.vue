<template>

    <Navigation/>

    <div class="main-holder">
        <aside>
            <Sidebar @clicked="switchPage"/>
        </aside>

        <main>
            <span v-if="decks">
                <Decks />
            </span>
            <span v-if="cards">
                <Cards />
            </span>
        </main>

        <b></b>
    </div>

</template>

<script>
    import Navigation from '@/components/Navigation.vue';
    import Decks from '@/components/Decks.vue';
    import Cards from '@/components/Cards.vue';
    import Sidebar from '@/components/Sidebar.vue';

    export default {
        name: 'MainCnt',

        data() {
            return {
                cards: false,
                decks: true,
            }
        },

        components: {
            Navigation,
            Decks,
            Cards,
            Sidebar
        },

        mounted () {
            this.page();
        },

        computed: {},

        methods: {
            page(){
                console.log(window.location.href)
                let page = window.location.href.slice(22,27);
                console.log()
                if(page == "decks") {
                    this.decks = true
                    this.cards = false
                }
                else if(page == "cards") {
                    this.decks = false
                    this.cards = true
                }
            },

            // SWITCH PAGE
            switchPage (_event) {
                (_event == "Decks") ? (this.decks = true, this.cards = false) : (this.decks = false, this.cards = true);
            },
        },
    }
</script>

<style scoped lang="scss">
    aside{
        position: sticky;
        top: 78px;
        height: calc(100vh - 78px);
    }
</style>
