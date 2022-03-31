<template>
    <div class="cards" @keydown="cardReview()" tabindex="0">

        <Progress  @save-and-exit="cardUpdate"/>

        <div class="timer">
            <p :class="this.timer == '00:00' ? ' timer-end' : '' "> {{ this.timer }} </p>
        </div>

        <div class="card" v-if="!loading">

            <div class="card-image" >
                <img v-if="cards[card_index].img_url" :src="cards[card_index].img_url"/>
                <img v-else src="@/assets/undraw_images_re_0kll.svg" class="image-fit"/>
            </div>

            <div class="card-question">
                <p> {{ cards[card_index].question }}</p>
            </div>

            <div class="card-answer">
                <p  v-if="reveal" > {{ cards[card_index].answer }}</p>
            </div>

            <div class="card-btn">
                <div class="card-btn-holder">

                        <div class="spacebar" :class="reveal ? 'hide-btn' : '' ">
                            <p>spacebar</p>
                            <button id="spacebar" @click="cardReview">Show answer</button>
                        </div>

                        <div class="result result-fail" :class="!reveal ? 'hide-btn' : '' ">
                            <div class="arrow">
                                <svg width="30px" height="30px"  fill="#8885" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M20.3284 11.0001V13.0001L7.50011 13.0001L10.7426 16.2426L9.32842 17.6568L3.67157 12L9.32842 6.34314L10.7426 7.75735L7.49988 11.0001L20.3284 11.0001Z"
                                        fill="#8885"
                                    />
                                </svg>
                            </div>
                            <button id="fail" @click="cardReview">Fail</button>
                        </div>

                        <div class="result result-pass" :class="!reveal ? 'hide-btn' : '' ">
                            <div class="arrow">
                                <svg width="30px" height="30px"  fill="#8885" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M15.0378 6.34317L13.6269 7.76069L16.8972 11.0157L3.29211 11.0293L3.29413 13.0293L16.8619 13.0157L13.6467 16.2459L15.0643 17.6568L20.7079 11.9868L15.0378 6.34317Z"
                                        fill="#8885"
                                    />
                                </svg>
                            </div>
                            <button id="pass" @click="cardReview">Pass</button>
                        </div>

                </div>
            </div>     

        </div>

    </div>
</template>

<script>
    import { URI, axios } from '@/plugins/index.js';
    import { spacedRepetition } from '@/plugins/spaced_repetition.js';
    import Progress from '@/components/Progress.vue';

    export default {
        name: 'Review',

        data() {
            return {
                cards: [],
                user_cards: [],
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
            }
        },

        components: {
            Progress,
        },

        mounted () {
            this.getDeckCards();
            const timer = setInterval(() => {
                this.timeCount--;
                (this.timeCount > 9) ? this.timer = `00:${this.timeCount}` : this.timer = `00:0${this.timeCount}` ;
                if (this.timeCount === 0) {
                    clearInterval(timer);
                }
            }, 1000);
        },

        computed: {
            feedback () { 
                return this.$store.getters.getFeedback 
            }
        },

        methods: {
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
                        console.log(res.data)
                        this.cards = res.data.userDeck.cards; 
                        this.loading = false;
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
                            })
                            .catch(err => { console.log(err) })
                    })
                    .catch(err => { 
                        if (err) this.$router.push({ path : `/kram` })
                        // console.log(err) 
                    })
                }
            },
            
            shuffleArray(_array) {
                for (let i = _array.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [_array[i], _array[j]] = [_array[j], _array[i]];
                }
            },

            // ------------------------------ REVIEW SESSION
            cardReview(){
                const WIDTH = window.innerWidth;

                if(!this.reveal && event.key == " " && WIDTH >= 1200 || !this.reveal && event.target.id == "spacebar" && WIDTH <= 1200 ) {
                    this.reveal = !this.reveal;
                } 
                else if (this.reveal && event.key == "ArrowRight" && WIDTH >= 1200 || 
                    this.reveal && event.key == "ArrowLeft" && WIDTH >= 1200 ||
                    this.reveal && event.target.id == "pass" && WIDTH <= 1200 ||
                    this.reveal && event.target.id == "fail" && WIDTH <= 1200) {
                        this.updateCard();
                }
            },

            updateCard(){
                this.cards[this.card_index] = spacedRepetition(this.cards[this.card_index], event.key, event.target.id)

                if(this.cardIds.length > 0){
                    this.reveal = !this.reveal;
                    this.card_index =  this.cardIds.shift();
                    this.timer = '01:00';
                    this.timeCount = 60;
                }   

                if(this.cardIds.length == 0 && this.reveal == true){
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
        object-fit: cover;
    }

    .timer{
        position: absolute;
        right: 0;
        &-end{
            color: #DB3C3A;
        }
    }

    @media (max-width: 480px) {
        .timer{
            padding: 20px;
            p{
                font-size: 18px;
            }
        }
    }

    @media (min-width: 480px) {
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
        .card{
            &-image{
                margin-top: 65px;
                
                & img{
                    // width: 250px; 
                    border-radius: 4px;        
                    background-size: cover;
                    background-repeat: no-repeat;
                    background-position: center;
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
        }
    }


    @media (min-width: 1200px) {

        .cards{
            display: flex;
            justify-content: center;
        }

        .save-btn{
            position: absolute;
            bottom: 0;
            right: 0;
            margin: 0px 25px 40px 0px;
            background-color: #DDD;
            padding: 10px;
            border-radius: 100%;
            width: 53px;
            height: 53px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: 0.4s;
            animation: quintic;

            &:hover{  
                transition: 0.4s;
                background-color: #222;
            }
        }

        .card{
            justify-content: center;

            &-image{
                margin-top: 100px;
                
                & img{
                    // width: 250px; 
                    border-radius: 4px;        
                    background-size: cover;
                    background-repeat: no-repeat;
                    background-position: center;
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
    }

    @media (max-height: 560px) {
        .card{
            &-image{
                margin-top: 65px;
                
                & img{
                    // width: 150px; 
                }
            }
        }
    }



</style>
