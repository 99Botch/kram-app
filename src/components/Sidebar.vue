<template>
    <div class="sidebar" v-if="$store.state.sessionState || null">
        
        <div class="links">    
            <div @click="switchPage($event)" 
                @mouseover="this.deckHover = !this.deckHover" 
                @mouseleave="this.deckHover = !this.deckHover" 
                class="frgDeck"
            >
                <img src="@/assets/tab.svg" class="frgDeck" v-if="!this.deckHover"/> 
                <img src="@/assets/tabHover.svg" class="frgDeck" v-if="this.deckHover"/> 
                <p class="frgDeck">My decks</p>
            </div>

            <span @mouseover="this.cardHover = !this.cardHover" @mouseleave="this.cardHover = !this.cardHover" >
                <div @click="switchPage($event)" class="frgCard">
                        <img src="@/assets/transcript.svg" class="frgCard" v-if="!this.cardHover"/>
                        <img src="@/assets/transcriptHover.svg" class="frgCard" v-if="this.cardHover"/> 
                        <span class="frgCard">Cards</span>
                </div>
            </span>
        </div>
        
        <div class="logout">
            <Logout />
        </div>

    </div>
</template>

<script>
    import Logout from '@/components/Logout.vue';

    export default {
        name: 'Sidebar',

        data() {
            return {
                cardHover: false,
                deckHover: false
            }
        },

        components: {
            Logout,
        },

        mounted () {},

        computed: {},

        methods: {
            switchPage(){
                (event.target.className == "frgDeck") ? this.$emit('clicked', 'Decks') : this.$emit('clicked', 'Cards');
            },
        },

    }
</script>


<style scoped lang="scss">
    .sidebar{
        height: 100%;
        display: grid;
        grid-template-rows: 90% 1fr;
    }
    .links{
        div{
            cursor: pointer;
        }
    }
    .logout{
        // margin: auto;
    }

@media (min-width: 480px) {
    .links{
        display: flex;
        flex-direction: column;
        justify-content: center;
        div{
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-bottom: 25px;
            border-left: 5px solid transparent;

            &:hover{
                color: #0079C2;
                border-left-color: #0079C2;
            }
        }         
        img{
            height: 20px;
        }
        p{
            font-size: 14px;
        }
    }

    .logout{
        display: flex;
        justify-content: center;
    }
}
</style>
