<template>
    <Feedback v-if="saved" />
    <span v-if="!loading">

        <div class="repo-header">
            <h4>Public decks</h4>

            <div class="flex flex-wrap items-center dropby-sort">
                <el-dropdown>
                    <el-button round>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="sort-chevron">
                        <path d="M6.34317 7.75732L4.92896 9.17154L12 16.2426L19.0711 9.17157L17.6569 7.75735L12 13.4142L6.34317 7.75732Z" fill="currentColor" />
                    </svg>    
                    Sort by
                    </el-button>
                <template #dropdown>
                    <el-dropdown-menu>
                            <el-dropdown-item @click="decksSort" class="repo-own sort-list" ><span class="repo-own sort-li">Not owned</span> </el-dropdown-item>
                            <el-dropdown-item @click="decksSort" class="repo-vts sort-list" ><span class="repo-vts sort-li">Votes</span> </el-dropdown-item>
                            <el-dropdown-item @click="decksSort" class="repo-ctg sort-list" ><span class="repo-ctg sort-li">Category</span> </el-dropdown-item>
                            <el-dropdown-item @click="decksSort" class="repo-upd sort-list" ><span class="repo-upd sort-li">Last update</span> </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
                </el-dropdown>
            </div>
        </div>

        <!-- MOBILES -->
        <div class="decks-repo" v-if="windowWidth < 500">
            <div>

                <span v-for="deck of decks" :key="deck._id">
                    <el-card  class="common-layout box-card" shadow="always">

                        <div class="repo-card-header">
                            <div>
                                <p class="deck-category">{{deck.category}}</p>
                                <h4>{{deck.name}}</h4>
                            </div>
                            
                            <div class="voting">
                                                                <button @click="vote(deck.index, 'up')" id="up" title="Upvote" class="btn-voter"
                                    :disabled="deck.voters.find(elem => elem.voter_id==this.id && elem.vote == 'up')">
                                    <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.5 15.5H3.5V6H0L5 0L10 6H6.5V15.5Z" fill="#8A8D90"/>
                                    </svg>
                                </button>
                                
                                <p class="votes" title="Votes">{{deck.votes}}</p>

                                <button @click="vote(deck.index, 'down')" id='down' title="Downvote" class="btn-voter"
                                    :disabled="deck.voters.find(elem => elem.voter_id==this.id && elem.vote == 'down')">
                                    <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.5 15.5H3.5V6H0L5 0L10 6H6.5V15.5Z" fill="#8A8D90"/>
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div class="repo-card-main">
                            <p>{{ deck.description }}</p>
                        </div>

                        <div class="repo-card-footer">
                            <button  class="add-to-profile" title="Add to deck" 
                                @click="addDeck(deck._id)" 
                                :disabled="deck.owned == 1" 
                            >
                            Add to my profile
                            </button>
                        </div>
                        
                    </el-card>
                </span>

            </div>
        </div>

        <!-- TABLETS -->
        <div class="decks-repo" v-if="windowWidth >= 500 && windowWidth < 900">
            <div>
                <span v-for="deck of decks" :key="deck._id">
                    <el-card  v-if="deck.index % 2 == 0" class="common-layout box-card" shadow="always">

                        <div class="repo-card-header">
                            <div>
                                <p class="deck-category">{{deck.category}}</p>
                                <h4>{{deck.name}}</h4>
                            </div>
                            
                            <div class="voting">
                                                                <button @click="vote(deck.index, 'up')" id="up" title="Upvote" class="btn-voter"
                                    :disabled="deck.voters.find(elem => elem.voter_id==this.id && elem.vote == 'up')">
                                    <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.5 15.5H3.5V6H0L5 0L10 6H6.5V15.5Z" fill="#8A8D90"/>
                                    </svg>
                                </button>
                                
                                <p class="votes" title="Votes">{{deck.votes}}</p>

                                <button @click="vote(deck.index, 'down')" id='down' title="Downvote" class="btn-voter"
                                    :disabled="deck.voters.find(elem => elem.voter_id==this.id && elem.vote == 'down')">
                                    <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.5 15.5H3.5V6H0L5 0L10 6H6.5V15.5Z" fill="#8A8D90"/>
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div class="repo-card-main">
                            <p>{{ deck.description }}</p>
                        </div>

                        <div class="repo-card-footer">
                            <button  class="add-to-profile" title="Add to deck" 
                                @click="addDeck(deck._id)" 
                                :disabled="deck.owned == 1" 
                            >
                            Add to my profile
                            </button>
                        </div>
                        
                    </el-card>
                </span>
            </div>

            <div>
                <span v-for="deck of decks" :key="deck._id">
                    <el-card  v-if="deck.index % 2 == 1" class="common-layout box-card" shadow="always">

                        <div class="repo-card-header">
                            <div>
                                <p class="deck-category">{{deck.category}}</p>
                                <h4>{{deck.name}}</h4>
                            </div>
                            
                            <div class="voting">
                                                                <button @click="vote(deck.index, 'up')" id="up" title="Upvote" class="btn-voter"
                                    :disabled="deck.voters.find(elem => elem.voter_id==this.id && elem.vote == 'up')">
                                    <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.5 15.5H3.5V6H0L5 0L10 6H6.5V15.5Z" fill="#8A8D90"/>
                                    </svg>
                                </button>
                                
                                <p class="votes" title="Votes">{{deck.votes}}</p>

                                <button @click="vote(deck.index, 'down')" id='down' title="Downvote" class="btn-voter"
                                    :disabled="deck.voters.find(elem => elem.voter_id==this.id && elem.vote == 'down')">
                                    <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.5 15.5H3.5V6H0L5 0L10 6H6.5V15.5Z" fill="#8A8D90"/>
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div class="repo-card-main">
                            <p>{{ deck.description }}</p>
                        </div>

                        <div class="repo-card-footer">
                            <button  class="add-to-profile" title="Add to deck" 
                                @click="addDeck(deck._id)" 
                                :disabled="deck.owned == 1" 
                            >
                            Add to my profile
                            </button>
                        </div>
                        
                    </el-card>
                </span>
            </div>
        </div>
        
        <!-- COMPUTERS -->
        <div class="decks-repo" v-if="windowWidth >= 900">
            <div>
                <span v-for="deck of decks" :key="deck._id">
                    <el-card  v-if="deck.index % 3 == 0" class="common-layout box-card" shadow="always">

                        <div class="repo-card-header">
                            <div>
                                <p class="deck-category">{{deck.category}}</p>
                                <h4>{{deck.name}}</h4>
                            </div>
                            
                            <div class="voting">
                                                                <button @click="vote(deck.index, 'up')" id="up" title="Upvote" class="btn-voter"
                                    :disabled="deck.voters.find(elem => elem.voter_id==this.id && elem.vote == 'up')">
                                    <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.5 15.5H3.5V6H0L5 0L10 6H6.5V15.5Z" fill="#8A8D90"/>
                                    </svg>
                                </button>
                                
                                <p class="votes" title="Votes">{{deck.votes}}</p>

                                <button @click="vote(deck.index, 'down')" id='down' title="Downvote" class="btn-voter"
                                    :disabled="deck.voters.find(elem => elem.voter_id==this.id && elem.vote == 'down')">
                                    <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.5 15.5H3.5V6H0L5 0L10 6H6.5V15.5Z" fill="#8A8D90"/>
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div class="repo-card-main">
                            <p>{{ deck.description }}</p>
                        </div>

                        <div class="repo-card-footer">
                            <button  class="add-to-profile" title="Add to deck" 
                                @click="addDeck(deck._id)" 
                                :disabled="deck.owned == 1" 
                            >
                            Add to my profile
                            </button>
                        </div>
                        
                    </el-card>
                </span>
            </div>

            <div>
                <span v-for="deck of decks" :key="deck._id">
                    <el-card  v-if="deck.index % 3 == 1" class="common-layout box-card" shadow="always">

                        <div class="repo-card-header">
                            <div>
                                <p class="deck-category">{{deck.category}}</p>
                                <h4>{{deck.name}}</h4>
                            </div>
                            
                            <div class="voting">
                                <button @click="vote(deck.index, 'up')" id="up" title="Upvote" class="btn-voter"
                                    :disabled="deck.voters.find(elem => elem.voter_id==this.id && elem.vote == 'up')">
                                    <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.5 15.5H3.5V6H0L5 0L10 6H6.5V15.5Z" fill="#8A8D90"/>
                                    </svg>
                                </button>
                                
                                <p class="votes" title="Votes">{{deck.votes}}</p>

                                <button @click="vote(deck.index, 'down')" id='down' title="Downvote" class="btn-voter"
                                    :disabled="deck.voters.find(elem => elem.voter_id==this.id && elem.vote == 'down')">
                                    <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.5 15.5H3.5V6H0L5 0L10 6H6.5V15.5Z" fill="#8A8D90"/>
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div class="repo-card-main">
                            <p>{{ deck.description }}</p>
                        </div>

                        <div class="repo-card-footer">
                            <button  class="add-to-profile" title="Add to deck" 
                                @click="addDeck(deck._id)" 
                                :disabled="deck.owned == 1" 
                            >
                            Add to my profile
                            </button>
                        </div>
                        
                    </el-card>
                </span>
            </div>

            <div>
                <span v-for="deck of decks" :key="deck._id">
                    <el-card  v-if="deck.index % 3 == 2" class="common-layout box-card" shadow="always">

                        <div class="repo-card-header">
                            <div>
                                <p class="deck-category">{{deck.category}}</p>
                                <h4>{{deck.name}}</h4>
                            </div>
                            
                            <div class="voting">
                                                                <button @click="vote(deck.index, 'up')" id="up" title="Upvote" class="btn-voter"
                                    :disabled="deck.voters.find(elem => elem.voter_id==this.id && elem.vote == 'up')">
                                    <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.5 15.5H3.5V6H0L5 0L10 6H6.5V15.5Z" fill="#8A8D90"/>
                                    </svg>
                                </button>
                                
                                <p class="votes" title="Votes">{{deck.votes}}</p>

                                <button @click="vote(deck.index, 'down')" id='down' title="Downvote" class="btn-voter"
                                    :disabled="deck.voters.find(elem => elem.voter_id==this.id && elem.vote == 'down')">
                                    <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.5 15.5H3.5V6H0L5 0L10 6H6.5V15.5Z" fill="#8A8D90"/>
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div class="repo-card-main">
                            <p>{{ deck.description }}</p>
                        </div>

                        <div class="repo-card-footer">
                            <button  class="add-to-profile" title="Add to deck" 
                                @click="addDeck(deck._id)" 
                                :disabled="deck.owned == 1" 
                            >
                            Add to my profile
                            </button>
                        </div>
                        
                    </el-card>
                </span>
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
        components: { Feedback },

        data() {
            return {
                loading: true,
                id: localStorage.getItem('_id'),
                decks: [],
                owned: [],
                saved: false,
                windowWidth: 0,
            }
        },

        mounted () {
            this.getDecks();
        },
        created() {
            window.addEventListener("resize", this.myEventHandler);
        },
        beforeUpdate(){
            if (this.$props.query.length != 0) this.decks = this.$props.query;
            this.windowWidth = window.innerWidth;
        },
        unmounted() {
            window.removeEventListener("resize", this.myEventHandler);
        },

        methods: {
            myEventHandler() {
                this.windowWidth = window.innerWidth;
            },

            decksSort(){
                this.loading = !this.loading;

                if(event.target.className.substr(0, 8) == 'repo-vts') this.decks = this.decks.sort((a, b) => b.votes - a.votes);
                else if(event.target.className.substr(0, 8) == 'repo-ctg') this.decks = this.decks.sort((a, b) => a.category > b.category);
                else if(event.target.className.substr(0, 8) == 'repo-own') this.decks = this.decks.sort((a, b) => b.owned < a.owned);
                else if(event.target.className.substr(0, 8) == 'repo-upd') this.decks = this.decks.sort((a, b) => b.last_update < a.last_update);

                this.decks.forEach((elem, i) => elem.index = i);
                this.loading = !this.loading;
            },

            async getDecks(){    

                if (!localStorage.getItem('token')) {
                    this.$router.push({ path : `/` });
                } else {
                    await axios.get( `${ URI }/decks/repository/${ this.id }`, {
                        headers: { Authorization: `Bearer ${ localStorage.getItem('token') }` }
                    })
                    .then(async response => {
                        let decks_og = await response.data;
                        this.loading = false;

                        let i = 0;
                        decks_og.forEach(deck => deck.index = i++);
                        this.owned = JSON.parse(localStorage.own_ids);

                        this.decks = decks_og.map(elem => {
                            this.owned.find(item => (item == elem._id) ? elem.owned = 1 : elem.owned = 0 )
                            return elem
                        })
                    })
                    .catch(err => { console.log(err) })
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


<style lang="scss">
    .repo-header,
    .my-deck-header{
        padding: 25px 15px 20px 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .sort-chevron{
            width: 15px;
            margin-right: 3px;
            padding-top: 2px;
        }

        h4{
            color: #8A8D90;
        }

        .dropby-sort button:hover{
            border-color: #0079C288;
            color: #0079C2DD;
        }
    }

    .sort-list {
        & .sort-li  {
            font-size: 16px;
            color: #8a8d90;
            font-family: arial;
            padding: 7px 10px;

            &:hover{
                color: #0079C2;
            }
        }

        &:hover > *{
            color: #0079C2;
        }
    }

    .decks-repo{
        margin: 0 15px;
        display: grid;

        .box-card{
            margin-bottom: 10px;
        }
    }

    @media (min-width: 500px) {
        .decks-repo{
            grid-template-columns: repeat(2,1fr);
            gap: 1rem;
        }
    }

    @media (min-width: 900px) {
        .decks-repo{
            max-width: 1200px;
            grid-template-columns: repeat(3,1fr);
            gap: 5px;
        }
    }

    .decks-repo :only-child{
        padding: 0px;
    }


    .box-card{
        height: fit-content;
    }

    .repo-card-header{
        display: grid;
        grid-template-columns: 90% auto;
        padding: 10px 20px 15px 20px !important;

        .voting{
            display: flex;
            flex-direction: column;
            align-items: flex-end;
        }
        .deck-category{
            font-size: 12px;
            color: #8a8d90;
            padding-bottom: 5px;
        }
        h4{
            font-weight: 600;
        }
    }

    .repo-card-main{
        padding: 0px 20px 25px 20px !important;
    }

    .repo-card-footer{
        button{
            text-align: left;
            width: 100%;
            padding: 0.75rem 0 1.1rem 0.75rem !important;
            border-radius: 0px 0px 3px 3px;
            border-width: 0px;
            background-color: #0079C2CC;
            color: white;
            cursor: pointer;
            font-size: 12px;
        }

        button:disabled{
            opacity: .6;
            cursor: auto;
        }
        
        button:hover{
            opacity: .6;
        }
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
        font-weight: 600;
    }
</style>
