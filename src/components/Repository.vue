<template>
    <Feedback v-if="saved" />
    <span v-if="!loading">

        <div class="repo-header">
            <h4>Public decks</h4>

            <div class="flex flex-wrap items-center dropby-sort">
                <el-dropdown>
                    <el-button>Sort by
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="sort-chevron">
                        <path d="M6.34317 7.75732L4.92896 9.17154L12 16.2426L19.0711 9.17157L17.6569 7.75735L12 13.4142L6.34317 7.75732Z" fill="currentColor" />
                    </svg>    
                    </el-button>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item><span class="sort-li">Last update</span> </el-dropdown-item>
                        <el-dropdown-item><span class="sort-li">Votes</span></el-dropdown-item>
                        <el-dropdown-item><span class="sort-li">Category</span></el-dropdown-item>
                    </el-dropdown-menu>
                </template>
                </el-dropdown>
            </div>
        </div>

        <div class="decks-repo" v-if="windowWidth <= 600">
            <el-card v-for="deck of decks" :key="deck._id" class="common-layout box-card" shadow="always">
                <div class="repo-card-header">
                    <button  class="add-to-profile" title="Add to deck" 
                        @click="addDeck(deck._id)" 
                        :disabled="owned.find(elem => elem ==deck._id)" 
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 4C11.4477 4 11 4.44772 11 5V11H5C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13H11V19C11 19.5523 11.4477 20 12 20C12.5523 20 13 19.5523 13 19V13H19C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11H13V5C13 4.44772 12.5523 4 12 4Z" fill="currentColor" /></svg>
                    </button>

                    <h6>{{deck.name}}</h6>

                    <p>{{deck.category}}</p>
                </div>

                <div class="repo-card-main">
                    <!--<p v-if="deck.description.length > 70">{{ deck.description.substring(0,67)+"..." }}</p>
                    <p v-else>{{ deck.description }}</p>-->
                    <p>{{ deck.description }}</p>
                </div>

                <div class="repo-card-footer">
                    <p class="votes" title="Votes">{{deck.votes}}</p>
                    
                    <button @click="vote(deck.index, 'up')" id="up" title="Upvote" class="btn-voter"
                        :disabled="deck.voters.find(elem => elem.voter_id==this.id && elem.vote == 'up')">
                        <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.5 17H5.5V7.5H2L7 1.5L12 7.5H8.5V17Z" fill="#8A8D90" stroke="#8A8D90"/>
                        </svg>
                    </button>

                    <button @click="vote(deck.index, 'down')" id='down' title="Downvote" class="btn-voter"
                        :disabled="deck.voters.find(elem => elem.voter_id==this.id && elem.vote == 'down')">
                        <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.5 17H5.5V7.5H2L7 1.5L12 7.5H8.5V17Z" fill="#8A8D90" stroke="#8A8D90"/>
                        </svg>
                    </button>

                </div>
            </el-card>
        </div>

        <div class="decks-repo" v-else>
            <div class="bite">
                <el-card v-for="deck of decks" :key="deck._id" class="common-layout box-card" shadow="always">
                    <div class="repo-card-header">
                        <button  class="add-to-profile" title="Add to deck" 
                            @click="addDeck(deck._id)" 
                            :disabled="owned.find(elem => elem ==deck._id)" 
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 4C11.4477 4 11 4.44772 11 5V11H5C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13H11V19C11 19.5523 11.4477 20 12 20C12.5523 20 13 19.5523 13 19V13H19C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11H13V5C13 4.44772 12.5523 4 12 4Z" fill="currentColor" /></svg>
                        </button>

                        <h6>{{deck.name}}</h6>

                        <p>{{deck.category}}</p>
                    </div>

                    <div class="repo-card-main">
                        <!--<p v-if="deck.description.length > 70">{{ deck.description.substring(0,67)+"..." }}</p>
                        <p v-else>{{ deck.description }}</p>-->
                        <p>{{ deck.description }}</p>
                    </div>

                    <div class="repo-card-footer">
                        <p class="votes" title="Votes">{{deck.votes}}</p>
                        
                        <button @click="vote(deck.index, 'up')" id="up" title="Upvote" class="btn-voter"
                            :disabled="deck.voters.find(elem => elem.voter_id==this.id && elem.vote == 'up')">
                            <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.5 17H5.5V7.5H2L7 1.5L12 7.5H8.5V17Z" fill="#8A8D90" stroke="#8A8D90"/>
                            </svg>
                        </button>

                        <button @click="vote(deck.index, 'down')" id='down' title="Downvote" class="btn-voter"
                            :disabled="deck.voters.find(elem => elem.voter_id==this.id && elem.vote == 'down')">
                            <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.5 17H5.5V7.5H2L7 1.5L12 7.5H8.5V17Z" fill="#8A8D90" stroke="#8A8D90"/>
                            </svg>
                        </button>

                    </div>
                </el-card>
            </div>

            <div>
                <el-card v-for="deck of decks_2" :key="deck._id"  class="common-layout box-card" shadow="always">a
                    <div class="repo-card-header">
                        <button  class="add-to-profile" title="Add to deck" 
                            @click="addDeck(deck._id)" 
                            :disabled="owned.find(elem => elem ==deck._id)" 
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 4C11.4477 4 11 4.44772 11 5V11H5C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13H11V19C11 19.5523 11.4477 20 12 20C12.5523 20 13 19.5523 13 19V13H19C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11H13V5C13 4.44772 12.5523 4 12 4Z" fill="currentColor" /></svg>
                        </button>

                        <h6>{{deck.name}}</h6>

                        <p>{{deck.category}}</p>
                    </div>

                    <div class="repo-card-main">
                        <p>{{ deck.description }}</p>
                    </div>

                    <div class="repo-card-footer">
                        <p class="votes" title="Votes">{{deck.votes}}</p>
                        
                        <button @click="vote(deck.index, 'up')" id="up" title="Upvote" class="btn-voter"
                            :disabled="deck.voters.find(elem => elem.voter_id==this.id && elem.vote == 'up')">
                            <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.5 17H5.5V7.5H2L7 1.5L12 7.5H8.5V17Z" fill="#8A8D90" stroke="#8A8D90"/>
                            </svg>
                        </button>

                        <button @click="vote(deck.index, 'down')" id='down' title="Downvote" class="btn-voter"
                            :disabled="deck.voters.find(elem => elem.voter_id==this.id && elem.vote == 'down')">
                            <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.5 17H5.5V7.5H2L7 1.5L12 7.5H8.5V17Z" fill="#8A8D90" stroke="#8A8D90"/>
                            </svg>
                        </button>

                    </div>
                </el-card>
            </div>
        </div>



    
    </span>
</template>

<script>
    import { URI, axios } from '@/plugins/index.js';
    import Feedback from '@/components/Feedback.vue';


    export default {
        name: 'Repository',
        props: ['query'],

        data() {
            return {
                loading: true,
                id: localStorage.getItem('_id'),
                decks: [],
                decks_2: [],
                decks_3: [],
                owned: [],
                saved: false,
                windowWidth: 0,
            }
        },

        components: {
            Feedback,
        },

        mounted () {
            this.getDecks()
        },

        computed: {},

        beforeUpdate(){
            if (this.$props.query.length != 0) this.decks = this.$props.query;
            this.windowWidth = window.innerWidth;
        },

        methods: {
            async getDecks(){    
                this.windowWidth = window.innerWidth;

                if (!localStorage.getItem('token')) {
                    this.$router.push({ path : `/` });
                } else {
                    await axios.get( `${ URI }/decks/repository/${ this.id }`, {
                        headers: { Authorization: `Bearer ${ localStorage.getItem('token') }` }
                    })
                    .then(async response => {
                        this.decks = await response.data;
                        this.loading = false;

                        let i = 0;
                        this.decks.forEach(deck => deck.index = i++);
                        this.owned = JSON.parse(localStorage.own_ids);
                        this.arrays();
                    })
                    .catch(err => { console.log(err) })
                }
            },

            arrays(){
                if(this.windowWidth > 600){
                    this.decks.filter(elem => {
                        if(elem.index % 2 != 0) {
                            this.decks_2.push(elem)
                            this.decks.splice(elem.index, 1)
                        }
                    })
                }
            },

            async addDeck(_id){
                let json = JSON.stringify({ 
                    deck_id: _id, ids: this.owned 
                });

                await axios.put(`${ URI }/decks/add/${ this.id }`, json, {
                headers: {
                        Authorization: `Bearer ${ localStorage.getItem('token') }`,
                        'Content-Type': 'application/json'
                    }
                })
                .then((res) => {
                    if(res.status === 200) {
                        let arr = JSON.parse(localStorage.getItem('own_ids'));
                        arr.push(res.data.deckCards._id);
                        localStorage.setItem('own_ids', JSON.stringify(arr));
                        this.addBtn(res.data.deckCards._id)
                        this.saved = true;
                        let counter = 2;
                        const timer = setInterval(() => {
                            counter--;
                            if (counter === 0) {
                                clearInterval(timer);
                                this.saved = false
                            }
                        }, 1000);
                    }
                })
                .catch((error) => {
                    console.log(error)
                });
            },

            addBtn(_id){
                this.owned.push(_id);
            },

            async vote(_index, _vote){
                let json;
                if(_vote == 'up'){
                    json = JSON.stringify({ 
                        deck_id: this.decks[_index]._id,
                        votes: this.decks[_index].votes += 1,
                        vote: this.decks[_index].voters[0].vote = 'up'
                    });

                    this.decks[_index].voters.find(elem => {
                        if (elem.voter_id == this.id){
                            elem.vote = 'up';
                        }else{
                            this.decks[_index].voters[0].voter_id = this.id;
                            elem.vote = 'up';
                        }
                    })
                }
                else if(_vote == 'down'){
                    json = JSON.stringify({ 
                        deck_id: this.decks[_index]._id,
                        votes: this.decks[_index].votes -= 1,
                        vote: this.decks[_index].voters[0].vote = 'down'
                    });

                    this.decks[_index].voters.find(elem => {
                        if (elem.voter_id == this.id){
                            elem.vote = 'down';
                        }else{
                            this.decks[_index].voters[0].voter_id = this.id;
                            elem.vote = 'down';
                        }
                    })
                }

                await axios.put(`${ URI }/decks/vote/${ this.id }`, json, {
                headers: {
                        Authorization: `Bearer ${ localStorage.getItem('token') }`,
                        'Content-Type': 'application/json'
                    }
                })
                .then((res) => {
                    if(res.status === 200) {
                        this.saved = true;
                        let counter = 2;
                        const timer = setInterval(() => {
                            counter--;
                            if (counter === 0) {
                                clearInterval(timer);
                                this.saved = false
                            }
                        }, 1000);
                    }
                })
                .catch((error) => {
                    console.log(error)
                });
            }
        },
    }
</script>


<style scoped lang="scss">
    .repo-header{
        padding: 25px 15px 20px 15px;
        display: flex;
        justify-content: space-between;

        .sort-chevron{
            width: 15px;
            padding-top: 5px;
        }
        h4{
            color: #8A8D90;
        }

        .dropby-sort li{
            color: red;
        }
        .dropby-sort button{
            border-color: #0079C2;
            color: #0079C2;
        }
    }

    .decks-repo{
        // max-width: 1200px;
        // margin: 0 15px;
        // display: grid;
        // grid-gap: 1rem;
        // grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    }


    .add-to-profile{
        border-radius: 50%;
        border-width: 0px;
        background-color: #0079C2CC;
        color: white;
        padding: 2px;
        cursor: pointer;
        margin-bottom: auto;
        height: 24px;
        width: 24px;

        &:disabled{
            opacity: .6;
            cursor: auto;
        }
        svg{
            display: flex;
            width: 16px;
            height: 16px;
            margin: 0px auto;
        }
    }

    .box-card{
        height: fit-content;
    }

    .repo-card-header{

    }

    .repo-card-main{

    }

    .repo-card--footer{
        // margin: auto -20px;
        // padding-left: 20px;
        // display: flex;
        // border-top: 1px solid #DDD;
    }

    .btn-voter{
        background-color: transparent;
        border-width: 0px;
        cursor: pointer;

        &:disabled{
            opacity: .5;
            cursor: auto;
        }
    }

    #down{
        transform: rotate(180deg);
    }

    .votes{
        padding-top: 5px;
        font-weight: 600;
    }
</style>
