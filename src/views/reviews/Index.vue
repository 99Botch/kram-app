<template>
    <div class="cards" @keydown="cardReview()" tabindex="0" id="reviewHolder" v-if="!loading">

        <el-link type="info" class="save-and-exit" @click="cardUpdate">save & exit review session</el-link>

        <div class="timer" v-if="!reveal">
            <p :class="this.timer == '00:00' ? ' timer-end' : '' "> {{ this.timer }} </p>
        </div>

        <button class="undo-btn" title="undo review" v-if="viewed_indexes.length > 0" @click="reverseReview">
            <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M5.33929 4.46777H7.33929V7.02487C8.52931 6.08978 10.0299 5.53207 11.6607 5.53207C15.5267 5.53207 18.6607 8.66608 18.6607 12.5321C18.6607 16.3981 15.5267 19.5321 11.6607 19.5321C9.51025 19.5321 7.58625 18.5623 6.30219 17.0363L7.92151 15.8515C8.83741 16.8825 10.1732 17.5321 11.6607 17.5321C14.4222 17.5321 16.6607 15.2935 16.6607 12.5321C16.6607 9.77065 14.4222 7.53207 11.6607 7.53207C10.5739 7.53207 9.56805 7.87884 8.74779 8.46777L11.3393 8.46777V10.4678H5.33929V4.46777Z" /></svg>
        </button>

        <div class="card">

            <div class="card-image" >
                <img v-if="cards[card_index].img_url" :src="cards[card_index].img_url" class="image-fit"/>
                <img v-else src="@/assets/undraw_images_re_0kll.svg" class="svg-fit"/>
            </div>

            <div class="card-question">
                <p> {{ cards[card_index].question }}</p>
            </div>

            <div class="card-answer">
                <p  v-if="reveal" > {{ cards[card_index].answer }}</p>
            </div>

            <div class="card-btn">
                <div class="card-btn-holder">

                        <div class="spacebar" :class="reveal ? 'hide-btn' : 'highlight-state' ">
                            <p>spacebar</p>
                            <button id="spacebar" @click="cardReview">Show answer</button>
                        </div>

                        <div class="result result-fail" :class="!reveal ? 'hide-btn' : 'highlight-state-btn' ">
                            <div class="arrow" :class="reveal ? 'highlight-state-border-fail' : '' ">
                                <svg width="30px" height="30px"  xmlns="http://www.w3.org/2000/svg" :class="!reveal ? 'svg-fail' : 'svg-fail-h' ">
                                    <path d="M20.3284 11.0001V13.0001L7.50011 13.0001L10.7426 16.2426L9.32842 17.6568L3.67157 12L9.32842 6.34314L10.7426 7.75735L7.49988 11.0001L20.3284 11.0001Z" />
                                </svg>
                            </div>
                            <button id="fail" @click="cardReview">Fail (60 sec)</button>
                        </div>

                        <div class="result" :class="!reveal ? ' result-undo' : ' result-undo-h' ">
                            <div class="arrow" >
                                <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M11.0001 3.67157L13.0001 3.67157L13.0001 16.4999L16.2426 13.2574L17.6568 14.6716L12 20.3284L6.34314 14.6716L7.75735 13.2574L11.0001 16.5001L11.0001 3.67157Z" /></svg>
                            </div>
                            <button @keyup.arrow-down="cardReview">Undo</button>
                        </div>

                        <div class="result result-pass" :class="!reveal ? 'hide-btn' : 'highlight-state-btn' ">
                            <div class="arrow" :class="reveal ? 'highlight-state-border-pass' : '' ">
                                <svg width="30px" height="30px"  xmlns="http://www.w3.org/2000/svg" :class="!reveal ? 'svg-pass' : 'svg-pass-h' ">
                                    <path d="M15.0378 6.34317L13.6269 7.76069L16.8972 11.0157L3.29211 11.0293L3.29413 13.0293L16.8619 13.0157L13.6467 16.2459L15.0643 17.6568L20.7079 11.9868L15.0378 6.34317Z" />
                                </svg>
                            </div>
                            <button id="pass" @click="cardReview">Pass ({{ this.nextInterval }})</button>
                        </div>

                </div>
            </div>     

        </div>

    </div>
</template>

<script>
    import { URI, axios } from '@/plugins/index.js';
    import { spacedRepetition } from '@/plugins/spaced_repetition.js';

    export default {
        name: 'Review',

        data() {
            return {
                user_cards: [],
                cards: [],
                id: localStorage.getItem('_id'),
                deck_id: this.$route.params.deckId,
                loading: true,
                reveal: false,
                card_index: null,
                finished: false,
                cardIds: [],
                session_length: null,
                timer: '01:00',
                timeCount: 60,
                learning_cue:  [60, 15, 1, 2, 7, 14, 30],
                nextInterval: 0,
                viewed_indexes: [],
                window_width: window.innerWidth
            }
        },

        components: {},

        mounted () {
            this.getDeckCards();
            this.clock();
        },

        computed: {
            feedback () { 
                return this.$store.getters.getFeedback 
            }
        },

        methods: {
            reverseReview(){
                this.cardIds.unshift(this.card_index);
                // this.cardIds.pop();
                this.card_index = this.viewed_indexes[this.viewed_indexes.length -1];
                this.viewed_indexes.pop();
                if(this.reveal) this.reveal = !this.reveal
            },

            clock(){
                const timer = setInterval(() => {
                    this.timeCount--;
                    (this.timeCount > 9) ? this.timer = `00:${this.timeCount}` : this.timer = `00:0${this.timeCount}` ;
                    if (this.timeCount === 0) {
                        clearInterval(timer);
                    }
                }, 1000);
            }, 

            predictInterval(){
                    let current_interval = this.learning_cue.find(elem => elem == this.cards[this.card_index].interval)
                    if(!current_interval || this.cards[this.card_index].interval == 60){
                        this.nextInterval = '15 min';
                    } 
                    else if(this.cards[this.card_index].interval == 30){
                        this.nextInterval = '30d';
                    } 
                    else {
                        let index = this.learning_cue[this.learning_cue.indexOf(current_interval) + 1];
                        this.nextInterval = index + 'd';
                    }                    
            },

            // ------------------------------ GET DECK DATA
            async getDeckCards(){
                if (!localStorage.getItem('token')) {
                    this.$router.push({ path : `/` });
                } else {
                    const json = JSON.stringify({ deck_id: this.deck_id});
                    await axios.post( `${ URI }/cards/deck/${ this.id }`,  json, {
                    headers: { 
                            'Authorization': `Bearer ${ localStorage.getItem('token') }`,
                            'Content-Type': 'application/json'
                        }
                    })
                    .then(async (res) => { 
                        this.cards = res.data.userDeck.cards; 
                        this.session_length = res.data.userDeck.cards.length -1;
                        for(let i = 0; i <= this.session_length ; i++){
                            this.cardIds.push(i)
                        }
                        this.shuffleArray(this.cardIds)
                        this.card_index =  this.cardIds.shift();

                            await axios.get( `${ URI }/cards/user/${ this.id }`,  {
                            headers: { 'Authorization': `Bearer ${ localStorage.getItem('token') }`}
                            })
                            .then(async (res) => { 
                                this.user_cards = res.data;
                                this.predictInterval ();
                                this.loading = false;
                            })
                            .catch(err => { console.log(err) })
                    })
                    .catch(err => { 
                        if (err) this.$router.push({ path : `/kram` })
                    })
                }
                document.getElementById('reviewHolder').focus();
            },
            
            shuffleArray(_array) {
                for (let i = _array.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [_array[i], _array[j]] = [_array[j], _array[i]];
                }
            },

            // ------------------------------ REVIEW SESSION
            cardReview(){

                if(!this.reveal && event.key == " " && this.window_width >= 1200 || !this.reveal && event.target.id == "spacebar" && this.window_width <= 1200 ) {
                    this.reveal = !this.reveal;
                } 
                else if (this.reveal && event.key == "ArrowRight" && this.window_width >= 1200 || 
                    this.reveal && event.key == "ArrowLeft" && this.window_width >= 1200 ||
                    this.reveal && event.target.id == "pass" && this.window_width <= 1200 ||
                    this.reveal && event.target.id == "fail" && this.window_width <= 1200) {
                        this.updateCard();
                        if (this.timer == '00:00') this.clock()
                        this.timeCount = 60;
                        this.timer = '01:00';
                    }
                this.predictInterval();
            },

            updateCard(){
                this.cards[this.card_index] = spacedRepetition(this.cards[this.card_index], event.key, event.target.id);
                this.viewed_indexes.push(this.card_index)
                
                if(this.cardIds.length == 0 && this.cards[this.card_index].interval == 15  || this.cardIds.length == 0 && this.cards[this.card_index].interval == 60 ){
                    this.reveal = !this.reveal;
                }

                else if(this.cardIds.length > 0){
                    if (this.cards[this.card_index].interval == 15  || this.cards[this.card_index].interval == 60 ){
                        this.cardIds.push(this.card_index);
                        this.card_index =  this.cardIds.shift(); 
                    }

                    else this.card_index =  this.cardIds.shift();
                        this.reveal = !this.reveal;
                }

                else if(this.cardIds.length == 0 && this.reveal == true){
                    this.cardUpdate();
                }
                
            },

            // ------------------------------ SEND JSON
            async cardUpdate(){
                let id = this.id;
                let user_cards = JSON.parse(JSON.stringify(this.user_cards));

                let cards = this.cards.map( card => {
                    let item = {
                        card_id: card.card_id,
                        next_session: card.next_session,
                        interval: card.interval,
                        fail_counter: card.fail_counter,
                        old_ease_factor: card.old_ease_factor,
                        ease_factor: card.ease_factor,
                        success_streak: card.success_streak,
                        style_id: card.style_id,
                    }
                    return item
                });

                cards.forEach(elem => {
                    user_cards.cards.find( item => {
                        if(elem.card_id == item.card_id){
                            user_cards.cards[user_cards.cards.indexOf(item)] = elem;
                        }
                    })
                })

                const json = JSON.stringify(user_cards);
                
                ( async function (){
                    await axios.put( `${ URI }/cards/review-session/${ id }`,  json, {
                    headers: { 
                            'Authorization': `Bearer ${ localStorage.getItem('token') }`,
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((res) => { 
                        console.log(res.status)
                    })
                    .catch(err => { console.log(err) })
                })();
                this.$store.dispatch('feedback', true);
                this.$router.push({ path : `/kram` });
            }
        },


        props: {}
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

    .image-fit{
        width: 350px;
        height: 300px;
        object-fit: contain;
        padding: 0 15px;
    }
    .svg-fit{
        width: 350px;
        height: 300px;
        object-fit: contain;
        opacity: .45;
        padding: 0 15px;
    }

    .save-and-exit{
        position: absolute;
        left: 0;
    }

    .timer{
        position: absolute;
        right: 0;
        &-end{
            color: #DB3C3A;
        }
    }

    .undo-btn{
        position: fixed;
        border-radius: 100%;
        border: 1px solid #C8C8C8;
        background-color: transparent;
        fill: #C8C8C8;
        right: 0;
        bottom: 0;
        width: 32px;
        height: 32px;
        cursor: pointer;

        &:hover, &:active{
            fill: #8a8d90;
            border-color: #8a8d90;
            background-color: #8a8d9011;
        }

        svg{
            width: 32px;
            height: 32px;  
            padding-bottom: 2px;
        }
    }
        
    .card-image{
        margin-top: 20vh;
    }

    @media (max-width: 480px) {
        .undo-btn{
            margin-bottom: 10vh;
            margin-right: 20px;
        }
        .save-and-exit{
            margin: 21px
        }
        .timer{
            padding: 20px;
            p{
                font-size: 18px;
            }
        }
    }

    @media (min-width: 480px) {
        .undo-btn{
            margin-bottom: 10vh;
            margin-right: 25px;
        }
        .save-and-exit{
            margin: 25px;
        }
        .timer{
            padding: 25px;
            p{
                font-size: 20px;
            }
        }
    }

    .cards{
        height: 100vh;
    }

    .card{
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;

        &-question , &-answer {
            height: 20px;
            margin-top: 25px;
        }
        
        &-question p, &-answer p{
            text-transform: capitalize;
            font-size: 18px;
        }

        &-btn{
            display: flex;
            flex-grow: 1;
            flex-direction: column-reverse;
        }
    }

    @media (max-width: 1200px) {

        .result-undo, .result-undo-h{
            display: none;   
        }
        .card{
            &-image{
                
                & img{
                    border-radius: 4px;
                    object-fit: contain;
                }
            }
            &-btn{
                width: 100%;
            }
            &-btn-holder{
                display: flex;
                cursor: pointer;
                justify-content: center;
            }
            button{
                border-width: 0px;
                font-size: 16px;
                text-transform: uppercase;
                cursor: pointer;
                padding: 20px 0px;
                background-color: transparent;
                width: 100%;
                color: white;
            }
            .spacebar{
                background-color: #0079c2DD;
                width: 100%;
            }
            .result-fail{
                background-color: #DB3C3AEE;
                &{
                    width: 100%;
                }
            }
            .result-pass{
                background-color: #29AB87EE;
                &{
                    width: 100%;
                }
            }
            .spacebar p, .arrow, .hide-btn{
                display: none;
            }
            .result-pass:active, .result-fail:active, .spacebar:active{
                opacity: .7;
            }
        }
    }


    @media (min-width: 1200px) {
        .undo-btn{
            display: none;
        }

        .cards{
            display: flex;
            justify-content: center;
        }

        .card{
            justify-content: center;

            &-image{
                
                & img{
                    border-radius: 4px;
                    object-fit: contain
                }
            }

            &-btn{
                flex-direction: row;
                margin-bottom: 50px;
                align-items: flex-end;

                &-holder{
                    display: flex;
                    gap: 25px;

                    button{
                        background-color: transparent;
                        border-width: 0px;
                        text-transform: uppercase;
                        font-weight: 600;
                        color: #8885;
                        padding-left: 7px;
                    }
                }

                .spacebar, .result{
                    display: flex;
                }                
            }

        }

        .spacebar p{
            width: 200px;
            height: 30px;
            border-radius: 5px;
            border: 2px solid #8885;
            color: #8885;
            text-transform: uppercase;
            font-size: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 600;
        }

        .arrow{
            border: 2px solid #8885;
            height: 30px;
            width: 30px;
            padding: 1px;
            border-radius: 4px;
        }

        .highlight-state{
            p{
                color: #228aca99;
                border-color: #228aca99;
            }
            button{
                color: #228aca99;
            }
        }

        .highlight-state-btn{
            & #fail{
                color: #dd494799;
            }
            & #pass{
                color: #37b08f99;
            }
        }

// :class="reveal ? 'svg-pass' : 'svg-pass-h' "
        .svg-pass, .svg-fail{
            fill: #d7d7d7;
        }
        .svg-fail-h{
            fill: #dd494799;
        }
        .highlight-state-border-fail{
            border-color: #dd494799;
        }
        .svg-pass-h{
            fill: #37b08f99;
        }
        .highlight-state-border-pass{
            border-color: #37b08f99;
        }

        .result-undo{
            .arrow{
                fill: #8885;
            }
        }

        .result-undo-h{
            button{
                color: #228aca99;
            }
            .arrow{
                border-color: #228aca99 ;
            }
            svg{
                fill: #228aca99;
            }
        }
    }

    @media (max-height: 560px) {
        .card{
            &-image{
                margin-top: 65px;
            }
        }
    }

</style>
