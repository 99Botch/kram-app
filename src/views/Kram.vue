<template>

    <Navigation/>

    <Hamburger v-if="menu" @clicked="switchPageMobile"/>
    
    <div class="ham-btn" @click="menu = !menu" >
        <div class="" :class="menu ? 'one' : '' "></div>
        <div class="" :class="menu ? 'two' : '' "></div>
    </div>

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
    import Hamburger from '@/components/Hamburger.vue';
    import Sidebar from '@/components/Sidebar.vue';

    export default {
        name: 'MainCnt',

        data() {
            return {
                cards: false,
                decks: true,
                menu: false,
                openMenu: false,
            }
        },

        components: {
            Navigation,
            Decks,
            Cards,
            Sidebar,
            Hamburger
        },

        mounted () {
            this.page();
        },

        computed: {},

        methods: {
            page(){
                let page = window.location.href.slice(22,27);
                (page == "decks") ? (this.decks = true, this.cards = false) : (page == "cards") ? (this.decks = false, this.cards = true) : null;
            },
            // SWITCH PAGE
            switchPage (_event) {
                (_event == "Decks") ? (this.decks = true, this.cards = false) : (this.decks = false, this.cards = true);
            },
            switchPageMobile (_event) {
                (_event == "Decks") ? (this.decks = true, this.cards = false) : (this.decks = false, this.cards = true);
                this.menu = false;
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

    .ham-btn{
        position: absolute;
        bottom: 0;
        right: 0;
        width: 36px;
        height: 36px;
        margin-right: 25px;
        margin-bottom: 30px;
        border-radius: 50%;
        border-width: 0px;
        cursor: pointer;
        background-color: #222;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        div{
            height: 2px;
            display: flex;
            width: 20px;
            background-color: white;
        }

        & :nth-child(1){
            margin-bottom: 5px;
            transition: all 0.3s;
        }

        & :nth-child(2){
            transition: all 0.3s;
        }

        .one{
            transform: rotate(45deg);
            margin-bottom: -2px;
        }

        .two{
            top: 50%;
            transform: rotate(-45deg);
        }
    }
    
</style>