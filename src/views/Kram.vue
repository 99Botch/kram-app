<template>
    <!-- 
        Tag names with special names declare a component, or a unique piece of code made by the developper
        They consist of an individual entity, independent of the larger frame
        When updating, the virtual DOM does so by changing specifically the component instead of the larger application
        Components allow to pass some JavaScript code directly within the tag name
        For example, Feedback pops up only if the state 'saved is set to true
    -->
    <Feedback v-if="saved" />

    <!--
        Tag names may also be binded to actions
        For example, if the user was to click on a link in the navigation, the switchPage function is trigerred to change the page layout
        picUrl passes a prop from the profile page to the navigation. That picUrl is however typical of the mishmash I've created
        Throughtout the application, I did that an early stage And I would have been better using Vuex instead before actully using
        VueX. I did not corrected those issue but that is something I would definitely refactor if I had more time

        I won't cover anymore JS attributes unless they are worth noting, its pretty much the same throughout the application
    -->
    <Navigation
        @clicked="switchPage"
        :picUrl="this.pic_url"
        :search="this.search"
        @keyup="query"
    />

    <Hamburger v-if="menu" @clicked="switchPageMobile" />

    <!--
        Hamburger menu pops up after a certain with, the classes are there to make some css animation   
    -->
    <div class="ham-btn" @click="menu = !menu">
        <div class="" :class="menu ? 'one' : ''"></div>
        <div class="" :class="menu ? 'two' : ''"></div>
    </div>

    <div class="main-holder">
        <aside class="aside-menu">
            <Sidebar @clicked="switchPage" />
        </aside>

        <main>
            <!--
                The mishmash below is the reason why the backawrd button is not everything
                What I thought would be a great idea for update efficiency backfired at me and I never revert back as I feared to break 
                the application.

                Basically, when switching page, the client stores a page value: decks, repository, cards and profile
                Based on what is getting store, the <main> element gets updated

                If I was to redo the applciation, I would keep the same philosophy of updating only the main element, but switching
                properly the apge intead of keeping a cental hub component

                That could be the worst decision I've made
            -->
            <Decks
                v-if="mountPage == 'deck'"
                @clicked="switchPageMobile"
                @page-switch="switchPage"
                :query="this.decks"
            />
            <Cards v-if="mountPage == 'card'" :query="this.cards" />
            <Profile v-if="mountPage == 'profile'" @pic-url="updPic" />
            <Repository
                v-if="mountPage == 'repository'"
                :query="this.repository"
            />
        </main>

        <b></b>
    </div>
</template>

<script>
// Imports middleware & components
import { URI, axios } from "@/plugins/index.js";
import Navigation from "@/components/Navigation.vue";
import Decks from "@/components/Decks.vue";
import Cards from "@/components/Cards.vue";
import Profile from "@/components/Profile.vue";
import Hamburger from "@/components/Hamburger.vue";
import Sidebar from "@/components/Sidebar.vue";
import Feedback from "@/components/Feedback.vue";
import Repository from "@/components/Repository.vue";

export default {
    // component name
    name: "MainCnt",
    // declare the components
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

    // declare teh staes that store data to be read from or written to in the client
    data() {
        return {
            menu: false,
            saved: this.$store.getters.getFeedback,
            mountPage: null,
            pic_url: null,
            decks: [],
            repository: [],
            cards: [],
            search: false,
        };
    },

    //mounted state triggers functions after all the data was mounted in the app, for further explanation on Vue Lifecycle, see the report 
    mounted() {
        this.redirect();
        this.feedback();
        this.page();
        this.pic();
    },

    computed: {},

    methods: {
        // the function bellow is an attempt to resetthe search bar when changing a page, but due to how complex
        // the app got by passing props here and there, I just drop the idea sue to lack of time
        query(items, query) {
            if (query == "my_decks") this.decks = items;
            if (query == "repository") this.repository = items;
            if (query == "cards") this.cards = items;
        },

        //send the pdated pic from the profile page to the navigation component 
        updPic(event) {
            this.pic_url = event;
        },

        async pic() {
            let id = localStorage.getItem("_id");

            await axios
                .get(`${URI}/users/pic/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                })
                .then((res) => {
                    this.pic_url = res.data.profile_pic_url;
                })
                .catch((error) => {
                    console.log(error.response.data);
                });
        },

        redirect() {
            if (!localStorage.getItem("token")) {
                this.$router.push({ path: `/` });
            }
        },

        // When logging in, or refreshing, the function checks wich page to mount
        page() {
            this.mountPage = localStorage.getItem("page");
            this.$store.dispatch("page", this.mountPage);
        },

        // Switch page updates the page to mount after the user clickes on a link the sidebar component or hamburger one
        switchPage(_event) {
            localStorage.setItem("page", _event);
            this.$store.dispatch("page", _event);
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
        switchPageMobile(_event) {
            console.log(_event);
            console.log(true);
            localStorage.setItem("page", _event);
            [this.mountPage, this.menu] = [_event, false];
        },

        // feedback get trigerred when an update occuse, such as adding a deck to one's profile
        // the tiny component dissapear after 5 seconds
        feedback() {
            if (this.saved) {
                let counter = 5;
                const timer = setInterval(() => {
                    counter--;
                    if (counter === 0) {
                        clearInterval(timer);
                        this.saved = false;
                        this.$store.dispatch("feedback", false);
                    }
                }, 1000);
            }
        },
    },
};
</script>

<style scoped lang="scss">
// As I said in main.js, I won't cover css
aside {
    position: sticky;
    top: 78px;
    height: calc(100vh - 78px);
}

.ham-btn {
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

    div {
        height: 2px;
        display: flex;
        width: 20px;
        background-color: white;
    }

    & :nth-child(1) {
        margin-bottom: 5px;
        transition: all 0.3s;
    }

    & :nth-child(2) {
        transition: all 0.3s;
    }

    .one {
        transform: rotate(45deg);
        margin-bottom: -2px;
    }

    .two {
        top: 50%;
        transform: rotate(-45deg);
    }
}

@media (max-width: 1024px) {
    .ham-btn {
        margin-bottom: 30px;
    }
}

@media (min-width: 1024px) {
    .ham-btn {
        display: none;
    }
}
</style>
