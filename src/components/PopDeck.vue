<template>
       <div class="pop-menu-deck" @click="outsider" id="popMenu" >
            
            <div class="pop-menu-deck-holder">

                <div class="pop-menu-deck-top">
                    <p>{{this.$props.deck.deck.name}}</p>
                    <svg class="pop-menu-close"  @click="$emit('clicked', false)" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
                        <path d="M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 10.5858L6.2253 4.81108Z" fill="currentColor" />
                    </svg>
                </div>
                
                <p @click="switchPage(this.deck._id)" class="switch-page">Cards</p>

                <div class="pop-menu-deck-form">
                    <p class="pop-menu-deck-section">Update deck</p>

                    <form>
                        <input type="text" name="" v-model="form.name" required placeholder="Name" />
                        <p class="form-items-error">{{ this.nameError }}</p>

                        <select v-model="form.category">
                            <option disabled>Pick a category</option>
                            <option v-for="category of categories" :key="category"> {{ category }}</option>
                        </select>
                        <p class="form-items-error">{{ this.categoryError }}</p>
                    </form>

                    <div class="">
                        <button type="submit" @click="submitDeck">Update deck</button>
                    </div>
                </div>

                <div class="pop-menu-deck-form">
                    <p class="pop-menu-deck-section">Change privacy setting</p>
                    <form>
                        <input type="checkbox" name="privacy" id="privacy" @click="checkbox">

                        <textarea v-model="privacy.description"></textarea>
                        <p class="form-items-error">{{ this.descriptionErr }}</p>
                    </form>
                    <div class="">
                        <button type="submit" @click="setPrivacy">Set privacy</button>
                    </div>
                </div>

                <div class="pop-menu-deck-form">
                    <p class="pop-menu-deck-section">Delete</p>
                    <button @click="$emit('deletion', this.deck._id, this.deck.index )">Delete</button>
                </div>
            </div>

        </div>
</template>

<script>
    import { URI, axios } from '@/plugins/index.js';

    export default {
        name: 'PopDecks',
        props: ['deck'],
        emits: ['clicked', 'deletion', 'cards'],

        data() {
            return {
                form: {
                    name: '',
                    category: '',
                },
                privacy: {
                    private: '',
                    description: '',
                },
                categories: ['Language', 'Mathematics', 'Science', 'History', 'Geography', 'Literature', 'Culture', 'Other'],
                nameError: "Err",
                categoryError: "Err",
                descriptionErr: "Err",
            }
        },

        components: {},

        mounted () {
            this.data();
        },

        computed: {},

        methods: {
            data(){
                let data  = JSON.parse(JSON.stringify(this.$props.deck));
                this.form.deck_id = data.deck._id;
                this.privacy.deck_id = data.deck._id;
                this.form.name = data.deck.name;
                this.form.category = data.deck.category;
                this.privacy.private = data.deck.private;
                this.privacy.description = data.deck.description;

                let pr = document.getElementById('privacy')
                if(!this.privacy.private){
                    pr.checked = !pr.checked
                }
            },

            outsider(){
                if (event.target.id == 'popMenu') this.$emit('clicked', false);
            },

            switchPage(_id){
                this.$emit('cards', 'card');
                this.$store.dispatch('deckCardsId', _id);
            },

            checkbox(){
                this.privacy.private = false
            },

            setPrivacy(){
                let pr = document.getElementById('privacy')
                
                if (pr.checked) {
                    this.privacy.private = false
                }  else {
                    this.privacy.private = true;
                }
                
                let json = JSON.stringify(this.privacy);
                axios.put(`${ URI }/decks/privacy/${ localStorage.getItem('_id') }`, json, {
                headers: {
                        Authorization: `Bearer ${ this.$props.deck.token }`,
                        'Content-Type': 'application/json'
                    }
                })
                .then((res) => {
                    if(res.status === 200) {
                        this.$emit('update-deck', JSON.parse(JSON.stringify(this.form)), this.$props.deck.deck.index);
                    }
                })
                .catch((error) => {
                    console.log(error)
                });
            },

            submitDeck(){
                let json = JSON.stringify(this.form);

                axios.put(`${ URI }/decks/${ localStorage.getItem('_id') }`, json, {
                headers: {
                        Authorization: `Bearer ${ this.$props.deck.token }`,
                        'Content-Type': 'application/json'
                    }
                })
                .then((res) => {
                    if(res.status === 200) {
                        this.$emit('update-deck', JSON.parse(JSON.stringify(this.form)), this.$props.deck.deck.index);
                    }
                })
                .catch((error) => {
                    console.log(error)
                });
            }
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

        &-holder{
            width: 25%;
            background-color: whitesmoke;
            // padding: 0px 15px;
        }

        svg{
            cursor: pointer;
            width: 18px;
        }

        .switch-page{
            padding: 30px 15px 15px 15px;
            text-transform: uppercase;
            font-size: 16px;
            cursor: pointer;
        }

        &-top{
            width: 100%;
            display: flex;
            justify-content: space-between;
            padding: 15px;
            align-items: center;
            border-bottom: 1px solid #2222;
            p{
                text-transform: uppercase;
            }
        }

        .pop-menu-deck-form{
            padding: 15px;
        }

        .pop-menu-deck-section{
            text-transform: uppercase;
            padding-bottom: 10px;
        }

        .form-items-error{
            color: #DB3C3A;
            font-size: 12px;
            padding: 3px 0px 8px 0px;
        }

        input{
            width: 100%;
            padding: 5px;
            border-radius: 0px;
            border-width: 0px;
            background-color: whitesmoke;
            font-size: 14px;
            outline: 0;

            &:focus{
                border-bottom: 1px solid #222
            }
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
