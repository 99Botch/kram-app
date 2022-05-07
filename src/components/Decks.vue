<!--to get more information on how the clinet displays the information, checks the repository page as it is more or less the same process
the differences being what gets rendered in the screen-->
<template>
    <Feedback v-if="saved" />
    <span v-if="!loading">
        <div class="my-deck-header">
            <h4 :class="windowWidth < 400 ? 'size-header' : null">My decks</h4>

            <div class="deck-btns">
                <button
                    @click="deletion = !deletion"
                    class="delete-deck"
                    title="Delete deck(s)"
                    :class="!deletion ? 'delete-off' : false"
                >
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M17 5V4C17 2.89543 16.1046 2 15 2H9C7.89543 2 7 2.89543 7 4V5H4C3.44772 5 3 5.44772 3 6C3 6.55228 3.44772 7 4 7H5V18C5 19.6569 6.34315 21 8 21H16C17.6569 21 19 19.6569 19 18V7H20C20.5523 7 21 6.55228 21 6C21 5.44772 20.5523 5 20 5H17ZM15 4H9V5H15V4ZM17 7H7V18C7 18.5523 7.44772 19 8 19H16C16.5523 19 17 18.5523 17 18V7Z"
                            fill="currentColor"
                        />
                        <path d="M9 9H11V17H9V9Z" fill="currentColor" />
                        <path d="M13 9H15V17H13V9Z" fill="currentColor" />
                    </svg>
                </button>

                <div class="flex flex-wrap items-center dropby-sort">
                    <el-dropdown>
                        <el-button round type="default" class="shrink-one">
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                class="sort-chevron"
                            >
                                <path
                                    d="M6.34317 7.75732L4.92896 9.17154L12 16.2426L19.0711 9.17157L17.6569 7.75735L12 13.4142L6.34317 7.75732Z"
                                    fill="currentColor"
                                />
                            </svg>
                            Sort by
                        </el-button>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item
                                    @click="sortingDecks"
                                    class="deck-rw sort-list"
                                    ><span class="deck-rw sort-li"
                                        >To review</span
                                    >
                                </el-dropdown-item>
                                <el-dropdown-item
                                    @click="sortingDecks"
                                    class="deck-cg sort-list"
                                    ><span class="deck-cg sort-li"
                                        >Category</span
                                    >
                                </el-dropdown-item>
                                <el-dropdown-item
                                    @click="sortingDecks"
                                    class="deck-nm sort-list"
                                    ><span class="deck-nm sort-li">Name</span>
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </div>

                <span class="form-pop-up">
                    <el-button
                        type="primary"
                        @click="popForm('AddDeck')"
                        class="add-deck-btn"
                    >
                        New deck
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M12 4C11.4477 4 11 4.44772 11 5V11H5C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13H11V19C11 19.5523 11.4477 20 12 20C12.5523 20 13 19.5523 13 19V13H19C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11H13V5C13 4.44772 12.5523 4 12 4Z"
                                fill="currentColor"
                            />
                        </svg>
                    </el-button>

                    <AddDeck
                        @clicked="renderDeck"
                        @close="closePop"
                        v-if="formAddDeck"
                    />
                </span>
            </div>
        </div>

        <div v-if="!decks.length && !loading" class="empty-msg">
            <h4>You don't have any decks !!!</h4>
            <p>
                Click the 'new deck' button or get one from our Kram community
            </p>
        </div>

        <!-- MOBILE -->
        <div class="decks-repo" v-if="windowWidth < 500">
            <div>
                <span v-for="deck of decks" :key="deck._id">
                    <el-card class="common-layout box-card" shadow="always">
                        <div class="repo-card-header">
                            <div>
                                <p class="deck-category">{{ deck.category }}</p>
                                <h4>{{ deck.name }}</h4>
                            </div>

                            <div class="voting">
                                <svg
                                    width="4"
                                    height="14"
                                    viewBox="0 0 4 14"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    @click="popMenu(deck)"
                                    class="three-dots-menu"
                                >
                                    <circle
                                        cx="2"
                                        cy="2"
                                        r="2"
                                        fill="#222222"
                                    />
                                    <circle
                                        cx="2"
                                        cy="7"
                                        r="2"
                                        fill="#222222"
                                    />
                                    <circle
                                        cx="2"
                                        cy="12"
                                        r="2"
                                        fill="#222222"
                                    />
                                </svg>
                            </div>
                        </div>

                        <div class="repo-card-main">
                            <p v-if="!deck.description" class="no-description">
                                Hey, add a description ;)
                            </p>
                            <p v-else>{{ deck.description }}</p>
                            <button @click="pageSwitch(deck._id)" v-if="deck.card_count > 0" class="fetch-deck-card" title="Show the deck's cards">Browse deck's cards</button>
                        </div>

                        <span v-if="deletion">
                            <button
                                class="delete-deck-btn"
                                @click="deleteDeck(deck._id, deck.index)"
                            >
                                Delete {{ deck.name }}
                            </button>
                        </span>

                        <span v-else-if="!deletion">
                            <router-link
                                :to="{
                                    name: 'Review',
                                    params: { deckId: deck._id },
                                }"
                            >
                                <button
                                    class="review-btn"
                                    :disabled="deck.card_count == 0"
                                >
                                    <span v-if="deck.card_count == 0"
                                        >/w No cards to review yet..</span
                                    >
                                    <span v-else-if="deck.card_count == 1"
                                        >Review {{ deck.card_count }} card</span
                                    >
                                    <span v-else
                                        >Review
                                        {{ deck.card_count }} cards</span
                                    >
                                </button>
                            </router-link>
                        </span>
                    </el-card>
                </span>
            </div>
        </div>

        <!-- TABLETS -->
        <div class="decks-repo" v-if="windowWidth >= 500 && windowWidth < 900">
            <div>
                <span v-for="deck of decks" :key="deck._id">
                    <el-card
                        v-if="deck.index % 2 == 0"
                        class="common-layout box-card"
                        shadow="always"
                    >
                        <div class="repo-card-header">
                            <div>
                                <p class="deck-category">{{ deck.category }}</p>
                                <h4>{{ deck.name }}</h4>
                            </div>

                            <div class="voting">
                                <svg
                                    width="4"
                                    height="14"
                                    viewBox="0 0 4 14"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    @click="popMenu(deck)"
                                    class="three-dots-menu"
                                >
                                    <circle
                                        cx="2"
                                        cy="2"
                                        r="2"
                                        fill="#222222"
                                    />
                                    <circle
                                        cx="2"
                                        cy="7"
                                        r="2"
                                        fill="#222222"
                                    />
                                    <circle
                                        cx="2"
                                        cy="12"
                                        r="2"
                                        fill="#222222"
                                    />
                                </svg>
                            </div>
                        </div>

                        <div class="repo-card-main">
                            <p v-if="!deck.description" class="no-description">
                                Hey, add a description ;)
                            </p>
                            <p v-else>{{ deck.description }}</p>
                            <button @click="pageSwitch(deck._id)" v-if="deck.card_count > 0" class="fetch-deck-card" title="Show the deck's cards">Browse deck's cards</button>
                        </div>

                        <span v-if="deletion">
                            <button
                                class="delete-deck-btn"
                                @click="deleteDeck(deck._id, deck.index)"
                            >
                                Delete {{ deck.name }}
                            </button>
                        </span>

                        <span v-else-if="!deletion">
                            <router-link
                                :to="{
                                    name: 'Review',
                                    params: { deckId: deck._id },
                                }"
                            >
                                <button
                                    class="review-btn"
                                    :disabled="deck.card_count == 0"
                                >
                                    <span v-if="deck.card_count == 0"
                                        >/w No cards to review yet..</span
                                    >
                                    <span v-else-if="deck.card_count == 1"
                                        >Review {{ deck.card_count }} card</span
                                    >
                                    <span v-else
                                        >Review
                                        {{ deck.card_count }} cards</span
                                    >
                                </button>
                            </router-link>
                        </span>
                    </el-card>
                </span>
            </div>

            <div>
                <span v-for="deck of decks" :key="deck._id">
                    <el-card
                        v-if="deck.index % 2 == 1"
                        class="common-layout box-card"
                        shadow="always"
                    >
                        <div class="repo-card-header">
                            <div>
                                <p class="deck-category">{{ deck.category }}</p>
                                <h4>{{ deck.name }}</h4>
                            </div>

                            <div class="voting">
                                <svg
                                    width="4"
                                    height="14"
                                    viewBox="0 0 4 14"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    @click="popMenu(deck)"
                                    class="three-dots-menu"
                                >
                                    <circle
                                        cx="2"
                                        cy="2"
                                        r="2"
                                        fill="#222222"
                                    />
                                    <circle
                                        cx="2"
                                        cy="7"
                                        r="2"
                                        fill="#222222"
                                    />
                                    <circle
                                        cx="2"
                                        cy="12"
                                        r="2"
                                        fill="#222222"
                                    />
                                </svg>
                            </div>
                        </div>

                        <div class="repo-card-main">
                            <p v-if="!deck.description" class="no-description">
                                Hey, add a description ;)
                            </p>
                            <p v-else>{{ deck.description }}</p>
                            <button @click="pageSwitch(deck._id)" v-if="deck.card_count > 0" class="fetch-deck-card" title="Show the deck's cards">Browse deck's cards</button>
                        </div>

                        <span v-if="deletion">
                            <button
                                class="delete-deck-btn"
                                @click="deleteDeck(deck._id, deck.index)"
                            >
                                Delete {{ deck.name }}
                            </button>
                        </span>

                        <span v-else-if="!deletion">
                            <router-link
                                :to="{
                                    name: 'Review',
                                    params: { deckId: deck._id },
                                }"
                            >
                                <button
                                    class="review-btn"
                                    :disabled="deck.card_count == 0"
                                >
                                    <span v-if="deck.card_count == 0"
                                        >/w No cards to review yet..</span
                                    >
                                    <span v-else-if="deck.card_count == 1"
                                        >Review {{ deck.card_count }} card</span
                                    >
                                    <span v-else
                                        >Review
                                        {{ deck.card_count }} cards</span
                                    >
                                </button>
                            </router-link>
                        </span>
                    </el-card>
                </span>
            </div>
        </div>

        <!-- COMPUTER -->
        <div class="decks-repo" v-if="windowWidth >= 900">
            <div>
                <span v-for="deck of decks" :key="deck._id">
                    <el-card
                        v-if="deck.index % 3 == 0"
                        class="common-layout box-card"
                        shadow="always"
                    >
                        <div class="repo-card-header">
                            <div>
                                <p class="deck-category">{{ deck.category }}</p>
                                <h4>{{ deck.name }}</h4>
                            </div>

                            <div class="voting">
                                <svg
                                    width="4"
                                    height="14"
                                    viewBox="0 0 4 14"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    @click="popMenu(deck)"
                                    class="three-dots-menu"
                                >
                                    <circle
                                        cx="2"
                                        cy="2"
                                        r="2"
                                        fill="#222222"
                                    />
                                    <circle
                                        cx="2"
                                        cy="7"
                                        r="2"
                                        fill="#222222"
                                    />
                                    <circle
                                        cx="2"
                                        cy="12"
                                        r="2"
                                        fill="#222222"
                                    />
                                </svg>
                            </div>
                        </div>

                        <div class="repo-card-main">
                            <p v-if="!deck.description" class="no-description">
                                Hey, add a description ;)
                            </p>
                            <p v-else>{{ deck.description }}</p>
                            <button @click="pageSwitch(deck._id)" v-if="deck.card_count > 0" class="fetch-deck-card" title="Show the deck's cards">Browse deck's cards</button>
                        </div>

                        <span v-if="deletion">
                            <button
                                class="delete-deck-btn"
                                @click="deleteDeck(deck._id, deck.index)"
                            >
                                Delete {{ deck.name }}
                            </button>
                        </span>

                        <span v-else-if="!deletion">
                            <router-link
                                :to="{
                                    name: 'Review',
                                    params: { deckId: deck._id },
                                }"
                            >
                                <button
                                    class="review-btn"
                                    :disabled="deck.card_count == 0"
                                >
                                    <span v-if="deck.card_count == 0"
                                        >/w No cards to review yet..</span
                                    >
                                    <span v-else-if="deck.card_count == 1"
                                        >Review {{ deck.card_count }} card</span
                                    >
                                    <span v-else
                                        >Review
                                        {{ deck.card_count }} cards</span
                                    >
                                </button>
                            </router-link>
                        </span>
                    </el-card>
                </span>
            </div>

            <div>
                <span v-for="deck of decks" :key="deck._id">
                    <el-card
                        v-if="deck.index % 3 == 1"
                        class="common-layout box-card"
                        shadow="always"
                    >
                        <div class="repo-card-header">
                            <div>
                                <p class="deck-category">{{ deck.category }}</p>
                                <h4>{{ deck.name }}</h4>
                            </div>

                            <div class="voting">
                                <svg
                                    width="4"
                                    height="14"
                                    viewBox="0 0 4 14"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    @click="popMenu(deck)"
                                    class="three-dots-menu"
                                >
                                    <circle
                                        cx="2"
                                        cy="2"
                                        r="2"
                                        fill="#222222"
                                    />
                                    <circle
                                        cx="2"
                                        cy="7"
                                        r="2"
                                        fill="#222222"
                                    />
                                    <circle
                                        cx="2"
                                        cy="12"
                                        r="2"
                                        fill="#222222"
                                    />
                                </svg>
                            </div>
                        </div>

                        <div class="repo-card-main">
                            <p v-if="!deck.description" class="no-description">
                                Hey, add a description ;)
                            </p>
                            <p v-else>{{ deck.description }}</p>
                            <button @click="pageSwitch(deck._id)" v-if="deck.card_count > 0" class="fetch-deck-card" title="Show the deck's cards">Browse deck's cards</button>
                        </div>

                        <span v-if="deletion">
                            <button
                                class="delete-deck-btn"
                                @click="deleteDeck(deck._id, deck.index)"
                            >
                                Delete {{ deck.name }}
                            </button>
                        </span>

                        <span v-else-if="!deletion">
                            <router-link
                                :to="{
                                    name: 'Review',
                                    params: { deckId: deck._id },
                                }"
                            >
                                <button
                                    class="review-btn"
                                    :disabled="deck.card_count == 0"
                                >
                                    <span v-if="deck.card_count == 0"
                                        >/w No cards to review yet..</span
                                    >
                                    <span v-else-if="deck.card_count == 1"
                                        >Review {{ deck.card_count }} card</span
                                    >
                                    <span v-else
                                        >Review
                                        {{ deck.card_count }} cards</span
                                    >
                                </button>
                            </router-link>
                        </span>
                    </el-card>
                </span>
            </div>

            <div>
                <span v-for="deck of decks" :key="deck._id">
                    <el-card
                        v-if="deck.index % 3 == 2"
                        class="common-layout box-card"
                        shadow="always"
                    >
                        <div class="repo-card-header">
                            <div>
                                <p class="deck-category">{{ deck.category }}</p>
                                <h4>{{ deck.name }}</h4>
                            </div>

                            <div class="voting">
                                <svg
                                    width="4"
                                    height="14"
                                    viewBox="0 0 4 14"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    @click="popMenu(deck)"
                                    class="three-dots-menu"
                                >
                                    <circle
                                        cx="2"
                                        cy="2"
                                        r="2"
                                        fill="#222222"
                                    />
                                    <circle
                                        cx="2"
                                        cy="7"
                                        r="2"
                                        fill="#222222"
                                    />
                                    <circle
                                        cx="2"
                                        cy="12"
                                        r="2"
                                        fill="#222222"
                                    />
                                </svg>
                            </div>
                        </div>

                        <div class="repo-card-main">
                            <p v-if="!deck.description" class="no-description">
                                Hey, add a description ;)
                            </p>
                            <p v-else>{{ deck.description }}</p>
                            <button @click="pageSwitch(deck._id)" v-if="deck.card_count > 0" class="fetch-deck-card" title="Show the deck's cards">Browse deck's cards</button>
                        </div>

                        <span v-if="deletion">
                            <button
                                class="delete-deck-btn"
                                @click="deleteDeck(deck._id, deck.index)"
                            >
                                Delete {{ deck.name }}
                            </button>
                        </span>

                        <span v-else-if="!deletion">
                            <router-link
                                :to="{
                                    name: 'Review',
                                    params: { deckId: deck._id },
                                }"
                            >
                                <button
                                    class="review-btn"
                                    :disabled="deck.card_count == 0"
                                >
                                    <span v-if="deck.card_count == 0"
                                        >/w No cards to review yet..</span
                                    >
                                    <span v-else-if="deck.card_count == 1"
                                        >Review {{ deck.card_count }} card</span
                                    >
                                    <span v-else
                                        >Review
                                        {{ deck.card_count }} cards</span
                                    >
                                </button>
                            </router-link>
                        </span>
                    </el-card>
                </span>
            </div>
        </div>

        <PopDeck
            v-if="popMenuDeck"
            :deck="this.popMenuDeck"
            @clicked="popMenu"
            @update-deck="updateDeck"
        />
    </span>
</template>

<script>
import { URI, axios } from "@/plugins/index.js";
import AddDeck from "@/components/AddDeck.vue";
import Feedback from "@/components/Feedback.vue";
import PopDeck from "@/components/PopDeck.vue";

export default {
    name: "Decks",
    props: ["query"],
    emits: ["clicked"],
    components: {
        AddDeck,
        Feedback,
        PopDeck,
    },

    data() {
        return {
            decks: [],
            id: localStorage.getItem("_id"),
            saved: false,
            formAddDeck: false,
            loading: true,
            popMenuDeck: false,
            windowWidth: 0,
            deletion: false,
        };
    },

    mounted() {
        this.getDecks();
    },
    created() {
        window.addEventListener("resize", this.myEventHandler);
    },
    beforeUpdate() {
        if (this.$props.query.length != 0) this.decks = this.$props.query;
        this.windowWidth = window.innerWidth;
    },
    unmounted() {
        window.removeEventListener("resize", this.myEventHandler);
    },

    methods: {
        pageSwitch(e){
            console.log(e)
            this.$store.dispatch('cards', e);
            this.$emit('page-switch', 'card')
        },

        myEventHandler() {
            this.windowWidth = window.innerWidth;
        },

        sortingDecks() {
            this.loading = true;

            if (event.target.className.substr(0, 7) == "deck-rw")
                this.decks = this.decks.sort(
                    (a, b) => b.card_count - a.card_count
                );
            else if (event.target.className.substr(0, 7) == "deck-cg")
                this.decks = this.decks.sort((a, b) => a.category > b.category);
            else if (event.target.className.substr(0, 7) == "deck-nm")
                this.decks = this.decks.sort((a, b) => b.name < a.name);

            this.decks.forEach((elem, i) => (elem.index = i));
            this.loading = false;
        },

        popMenu(_deck) {
            !this.popMenuDeck
                ? (this.popMenuDeck = {
                      deck: JSON.parse(JSON.stringify(_deck)),
                  })
                : (this.popMenuDeck = false);
        },

        renderDeck(event) {
            [event.index, event.card_count] = [this.decks.length, 0];
            this.decks.push(event);
            this.formAddDeck = false;
            this.feedback();
        },

        popForm(event) {
            if (event == "AddDeck") [this.formAddDeck] = [true];
        },

        closePop() {
            this.formAddDeck = false;
        },

        updateDeck(_form, _index) {
            this.decks[_index].name = _form.name;
            this.decks[_index].category = _form.category;
            this.decks[_index].description = _form.description;
            this.decks[_index].private = _form.private;
        },

        async getDecks() {
            if (!localStorage.getItem("token")) {
                this.$router.push({ path: `/` });
            } else {
                await axios
                    .get(`${URI}/decks/${this.id}`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "token"
                            )}`,
                        },
                    })
                    .then(async (response) => {
                        this.decks = await response.data;
                        let i = 0;
                        this.loading = false;
                        this.decks.forEach((deck) => {
                            deck.index = i++;
                            delete deck.votes;
                            delete deck.voters;
                            delete deck.added_date;
                            delete deck.last_update;
                        });
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        },

        // DELETE DECK
        async deleteDeck(_id, _index) {
            let isExecuted = confirm(
                "Hey! Are you sure you want to delete that deck? All the information & styling will be lost forever:"
            );
            if (isExecuted) {
                await axios
                    .delete(`${URI}/decks/${this.id}/${_id}`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "token"
                            )}`,
                        },
                    })
                    .then(async () => {
                        this.popMenuDeck = false;

                        let arr = JSON.parse(localStorage.getItem("own_ids"));
                        let filtered = arr.filter((id) => id != _id);
                        localStorage.setItem(
                            "own_ids",
                            JSON.stringify(filtered)
                        );

                        this.decks.splice(_index, 1);
                        let i = 0;
                        this.decks.forEach((deck) => {
                            deck.index = i++;
                        });
                        this.feedback();
                    })
                    .catch((err) => {
                        console.log(err.request);
                    });
            }
        },

        //  REQUEST FEEDBACK
        feedback() {
            this.saved = true;
            let counter = 3;
            const timer = setInterval(() => {
                counter--;
                if (counter === 0) {
                    clearInterval(timer);
                    this.saved = false;
                }
            }, 1000);
        },
    },
};
</script>

<style scoped lang="scss">
.deck-btns {
    display: flex;
    gap: 10px;
}

.add-deck-btn {
    background-color: #0079c2;
    border-color: #0079c2;

    svg {
        margin-left: 5px;
        width: 16px;
    }

    &:hover {
        opacity: 0.6;
    }
}

.three-dots-menu{
    cursor: pointer;
}

.form-pop-up {
    position: relative;
}

div.empty-msg {
    padding-top: 20vh;
    display: flex;
    align-items: center;
    flex-direction: column;

    h4 {
        padding-bottom: 10px;
        color: #e05654;
    }

    p {
        width: 35ch;
        text-align: center;
        color: #c8c8c8;
    }
}

.fetch-deck-card{
    background-color: transparent;
    border: 0;
    text-transform: uppercase;
    font-size: 11px;
    padding-top: 10px;
    cursor: pointer;
    color: #0079c2BB;

    &:hover, &:focus{
        color: #0079c2;
        
    }
}

.no-description {
    color: #c8c8c8;
}

.review-btn,
.delete-deck-btn {
    width: 100%;
    text-align: left;
    padding: 0.75rem 0 1.1rem 0.75rem !important;
    border-radius: 0px 0px 3px 3px;
    border-width: 0px;
    color: white;
    cursor: pointer;
    font-size: 12px;
    &:hover {
        opacity: 0.75;
    }
}

.review-btn {
    background-color: #29ab87;
    &:disabled {
        opacity: 0.75;
        cursor: auto;
    }
}

.delete-deck {
    background-color: transparent;
    border-width: 0px;
    cursor: pointer;

    svg {
        color: #db3c3a;
    }
}

@media (max-width: 400px) {
    .delete-deck svg {
        width: 18px;
    }
    .shrink-one {
        width: 85px;
    }
    .add-deck-btn {
        width: 100px;
    }
}

.size-header {
    font-size: 18px;
}
.delete-off {
    opacity: 0.7;
}
.delete-deck-btn {
    background-color: #db3c3aee;
}
</style>
