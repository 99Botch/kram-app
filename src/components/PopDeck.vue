<template>
       <div class="pop-menu-deck" @click="outsider" id="popMenu" >
            
            <div class="pop-menu-deck-holder">

                <div class="pop-menu-deck-top">
                    <p>{{this.$props.deck.deck.name}}</p>
                    <svg class="pop-menu-close"  @click="$emit('clicked', false)" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
                        <path d="M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 10.5858L6.2253 4.81108Z" fill="currentColor" />
                    </svg>
                </div>
                
                <span class="animated-hover">
                    <button @click="switchPage(this.deck._id)" class="switch-page">Cards</button>
                </span>

                <div class="pop-menu-deck-form">
                    <label class="pop-menu-deck-section" for="deckName">
                        <p>Update deck</p>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
                            <path d="M10.5858 6.34317L12 4.92896L19.0711 12L12 19.0711L10.5858 17.6569L16.2427 12L10.5858 6.34317Z" fill="currentColor" />
                        </svg>
                    </label>

                    <form>
                        <input type="text" name="" v-model="form.name" required placeholder="Name" id="deckName"/>
                        <p class="form-items-error">{{ this.nameError }}</p>

                        <select v-model="form.category">
                            <option disabled>Pick a category</option>
                            <option v-for="category of categories" :key="category"> {{ category }}</option>
                        </select>
                    </form>

                    <div class="pop-menu-deck-btn" style="margin-top: 7px;">
                        <button type="submit" @click="submitDeck">Update deck</button>
                    </div>
                </div>

                <div class="pop-menu-deck-form">
                    <label class="pop-menu-deck-section" for="deckDescription">
                        <p>Privacy setting</p>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
                            <path d="M10.5858 6.34317L12 4.92896L19.0711 12L12 19.0711L10.5858 17.6569L16.2427 12L10.5858 6.34317Z" fill="currentColor" />
                        </svg>
                    </label>

                    <form>
                        <textarea v-model="privacy.description" id="deckDescription"></textarea>
                        <p class="form-items-error">{{ this.descriptionErr }}</p>

                        <label class="switch">
                            <input type="checkbox" name="privacy" id="privacy" @click="checkbox">
                            <span class="slider round"></span>
                        </label>    
                    </form>
                    <div class="pop-menu-deck-btn">
                        <button type="submit" @click="setPrivacy">Set privacy</button>
                    </div>
                </div>

                <div class="pop-menu-deck-form pop-menu-deck-form-del">
                    <p class="pop-menu-deck-section">Delete</p>
                    <button @click="$emit('deletion', this.$props.deck.deck._id, this.$props.deck.deck.index )">Delete</button>
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
                nameError: "",
                descriptionErr: "",
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

            async setPrivacy(){
                let pr = document.getElementById('privacy')

                if(pr.checked) this.privacy.private = false 
                else  this.privacy.private = true;

                if (!this.privacy.private && this.privacy.description.length < 5){
                    this.descriptionErr = 'w/ Please, provide a short description'
                } else {
                    let json = JSON.stringify(this.privacy);
                    await axios.put(`${ URI }/decks/privacy/${ localStorage.getItem('_id') }`, json, {
                    headers: {
                            Authorization: `Bearer ${ localStorage.getItem('token') }`,
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((res) => {
                        if(res.status === 200) {
                            this.$emit('update-deck', JSON.parse(JSON.stringify(this.form)), this.$props.deck.deck.index);
                            this.descriptionErr = ''
                        }
                    })
                    .catch((error) => {
                        console.log(error)
                    });
                }
            },

            async submitDeck(){

                if(this.form.name.length < 6){
                    this.nameError = "Deck's name must be 6 characters long"
                } else {
                    let json = JSON.stringify(this.form);

                    await axios.put(`${ URI }/decks/${ localStorage.getItem('_id') }`, json, {
                    headers: {
                            Authorization: `Bearer ${ localStorage.getItem('token') }`,
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((res) => {
                        if(res.status === 200) {
                            this.nameError = ''
                            this.$emit('update-deck', JSON.parse(JSON.stringify(this.form)), this.$props.deck.deck.index);
                        }
                    })
                    .catch((error) => {
                        console.log(error)
                    });
                }
            }
        },

        // props: {}
    }
</script>

<style scoped lang="scss">
    .pop-menu-deck{
        position: fixed;
        top: 0;
        right: 0;
        height: 100%;
        background-color: white;
        display: flex;
        justify-content: flex-end;
        background-color: #2224;
        width: 100%;

        &-holder{
            width: 40%;
            background-color: #FFF;
        }

        svg{
            cursor: pointer;
            width: 18px;
        }

        .switch-page{
            margin: 30px 15px 10px 15px;
            text-transform: uppercase;
            font-size: 16px;
            cursor: pointer;
            background-color: transparent;
            border-width: 0px;
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
            display: flex;
            align-items: center;
            cursor: pointer;
            svg{
                width: 14px;
            }
            &:hover{
                p{
                    margin-right: 7px;
                }
            }
        }

        .form-items-error{
            color: #DB3C3A;
            font-size: 12px;
            padding: 3px 0px 8px 5px;
            height: 25px;
        }

        .pop-menu-deck-btn{
            padding: 7px 0px;

            button{
                padding: 7px 14px;
                background-color: #0079C2CC;
                border-width: 0px;
                color: #FFF;
                border-radius: 4px;
                cursor: pointer;

                &:hover{
                    background-color:  #0079C2;
                }
            }
        }

        input, select, textarea{
            width: 100%;
            padding: 7px;
            border-radius: 0px;
            border: 1px solid transparent;
            background-color: #FFFFFF;
            font-size: 14px;
            outline: 0;
            border: 1px solid #2222;
            border-radius: 5px;

            &:focus{
                border: 1px solid #2228;
            }
        }
    }

    .switch {
        position: relative;
        display: inline-block;
        width: 30px;
        height: 14px;
    }

    .switch input { 
        opacity: 0;
        width: 0;
        height: 0;
    }

    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        -webkit-transition: .4s;
        transition: .4s;
    }

    .slider:before {
        position: absolute;
        content: "";
        height: 10px;
        width: 10px;
        left: 2px;
        bottom: 2px;
        background-color: white;
        -webkit-transition: .4s;
        transition: .4s;
    }

    input:checked + .slider {
        background-color: #2196F3;
    }

    input:focus + .slider {
        box-shadow: 0 0 1px #2196F3;
    }

    input:checked + .slider:before {
        -webkit-transform: translateX(16px);
        -ms-transform: translateX(16px);
        transform: translateX(16px);
    }

    /* Rounded sliders */
    .slider.round {
        border-radius: 34px;
    }

    .slider.round:before {
        border-radius: 50%;
    }

    .pop-menu-deck-form-del{
        p{
            color: #DB3C3AEE;
        }
        button{
            font-size: 12px;
            text-transform: uppercase;
            color: white;
            border-width: 0px;
            background-color: #DB3C3ACC;
            padding: 6px 10px;
            border-radius: 5px;
            cursor: pointer;

            &:hover{
                background-color: #DB3C3A;
            }
        }
    }

    @media (max-width: 1024px) {
        .pop-menu-deck div{
            width: 75%;
            .pop-menu-deck-top, .pop-menu-deck-form{
                width: 100%;
            }  
        }    

    }

    @media (max-width: 480px) {
        .pop-menu-deck div{
            width: 100%;
        }    
    }

</style>
