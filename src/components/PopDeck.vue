<template>
       <div class="pop-menu-deck" @click="outsider" id="popMenu" >
            
            <div>
                <div class="pop-menu-deck-top">
                    <p>{{this.deckDt.name}}</p>
                    <svg class="pop-menu-close"  @click="$emit('clicked', false)" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
                        <path d="M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 10.5858L6.2253 4.81108Z" fill="currentColor" />
                    </svg>
                </div>
                
                <p @click="$emit('cards', 'card')">Cards</p>

                <div>
                    Update deck
                </div>

                <div>
                    Change privacy setting
                </div>

                <div>
                    <p>Delete</p>
                    <button @click="$emit('deletion', this.deck._id, this.deck.index )">Delete</button>
                </div>
            </div>

        </div>
</template>

<script>
    // import { URI, axios } from '@/plugins/index.js';

    export default {
        name: 'PopDecks',
        props: ['deck'],
        emits: ['clicked', 'deletion', 'cards'],

        data() {
            return {
                deckDt: '',
            }
        },

        components: {},

        mounted () {
            this.data();
        },

        computed: {},

        methods: {
            data(){
                this.deckDt = JSON.parse(JSON.stringify(this.$props.deck))
            },

            outsider(){
                if (event.target.id == 'popMenu') this.$emit('clicked', false);
            },
        },

        // props: {}
    }
</script>

<style scoped lang="scss">
    .pop-menu-deck{
        position: absolute;
        top: 0;
        right: 0;
        height: 100%;
        background-color: white;
        display: flex;
        justify-content: flex-end;
        background-color: #2224;
        width: 100%;

        div{
            width: 25%;
            background-color: whitesmoke;
        }

        svg{
            cursor: pointer;
        }
    }

    @media (max-width: 480px) {
        .pop-menu-deck div{
            width: 90%;
        }    
    }

    @media (max-width: 1024px) {
        .pop-menu-deck div{
            width: 75%;
        }    
    }

</style>
