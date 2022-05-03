<template>

    <Feedback v-if="saved"/>
    <Navigation @clicked="switchPage" :picUrl="this.pic_url" :search='this.search' @keyup="query" />
    <Hamburger v-if="menu" @clicked="switchPageMobile"/>
    
    <div class="ham-btn" @click="menu = !menu" >
        <div class="" :class="menu ? 'one' : '' "></div>
        <div class="" :class="menu ? 'two' : '' "></div>
    </div>

    <div class="main-holder">
        <aside class="aside-menu">
            <Sidebar @clicked="switchPage"/>
        </aside>

        <main>
            <Decks v-if="mountPage == 'deck' " @clicked=" switchPageMobile" @page-switch="switchPage" :query="this.decks" />
            <Cards v-if="mountPage == 'card' " :query="this.cards"/>
            <Profile v-if="mountPage == 'profile' " @pic-url="updPic" />
            <Repository v-if="mountPage == 'repository' " :query="this.repository"/>
        </main>

        <b></b>        
    </div>

</template>

<script>
    import { URI, axios } from '@/plugins/index.js';
    import Navigation from '@/components/Navigation.vue';
    import Decks from '@/components/Decks.vue';
    import Cards from '@/components/Cards.vue';
    import Profile from '@/components/Profile.vue';
    import Hamburger from '@/components/Hamburger.vue';
    import Sidebar from '@/components/Sidebar.vue';
    import Feedback from '@/components/Feedback.vue';
    import Repository from '@/components/Repository.vue';

    export default {
        name: 'MainCnt',
        components: {
            Navigation,
            Decks,
            Cards,
            Profile,
            Repository,
            Sidebar,
            Hamburger,
            Feedback,
        },

        data() {
            return {
                menu: false,
                saved: this.$store.getters.getFeedback,
                mountPage: null,
                pic_url: null,
                decks: [],
                repository: [],
                cards: [],
                search: false
            }
        },

        mounted () {
            this.redirect();
            this.feedback();
            this.page();
            this.pic();
        },

        computed: {},

        methods: {
            query(items, query){
                if(query == 'my_decks') this.decks =  items;
                if(query == 'repository') this.repository =  items;
                if(query == 'cards') this.cards =  items;
            },

            updPic(event){
                this.pic_url = event;
            },

            async pic(){
                let id = localStorage.getItem("_id");

                await axios.get( `${ URI }/users/pic/${ id }` , {
                    headers: { Authorization: `Bearer ${ localStorage.getItem('token') }` }
                })
                .then(res => { this.pic_url = res.data.profile_pic_url; })
                .catch(error => { console.log(error.response.data) })
            },

            redirect(){
                if (!localStorage.getItem('token')) {
                    this.$router.push({ path : `/` });
                }
            },

            page(){
                this.mountPage = localStorage.getItem('page')
                this.$store.dispatch('page', this.mountPage);
            },

            // SWITCH PAGE
            switchPage (_event) {
                localStorage.setItem('page', _event);
                this.$store.dispatch('page', _event);
                this.mountPage = _event;
                
                let counter = 1;
                this.search = true;
                const timer = setInterval(() => {
                    counter--;
                    if (counter === 0) {
                        clearInterval(timer);
                        this.search = false;
                    }
                }, 1000);
            },

            // SWITCH PAGE MOBILE
            switchPageMobile (_event) {
                console.log(_event)
                console.log(true)
                localStorage.setItem('page', _event);
                [this.mountPage, this.menu] = [_event, false]
            },

            feedback(){
                if(this.saved){
                    let counter = 5;
                    const timer = setInterval(() => {
                        counter--;
                        if (counter === 0) {
                            clearInterval(timer);
                            this.saved = false
                            this.$store.dispatch('feedback', false);
                        }
                    }, 1000);
                }
            }
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
        z-index: 99;
        position: fixed;
        bottom: 0;
        right: 0;
        width: 36px;
        height: 36px;
        margin-right: 25px;
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

    @media (max-width: 1024px) {
        .ham-btn{
            margin-bottom: 30px;
        }
    }

    @media (min-width: 1024px) {
        .ham-btn{
            display: none;
        }
    }
</style>