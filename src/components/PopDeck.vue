<template>
    <Feedback v-if="saved" />
    <div class="pop-menu" @click="outsider" id="popMenu">
        <div
            class="pop-menu-holder"
            :class="windowWidth >= 600 ? 'two-sided' : null"
        >
            <div class="pop-update-top" v-if="windowWidth < 600">
                <h4>{{ this.$props.deck.deck.name }}</h4>
                <p>Update your deck</p>
            </div>

            <img :src="require('@/assets/update_deck.svg')" />

            <div>
                <div class="pop-update-top" v-if="windowWidth >= 600">
                    <h4>{{ this.$props.deck.deck.name }}</h4>
                    <p>Update your deck</p>
                </div>

                <div class="pop-update-form">
                    <div>
                        <label for="deckName">Deck name</label>
                        <el-input
                            class="input-inner"
                            type="text"
                            name=""
                            v-model="form.name"
                            required
                            placeholder="Name"
                            id="deckName"
                        />
                    </div>
                    <p
                        :class="
                            this.nameError ? 'error-msg' : 'error-msg-empty'
                        "
                    >
                        {{ this.nameError }}
                    </p>

                    <div class="deck-category">
                        <label for="deckCategory">Deck category</label>
                        <el-select v-model="form.category" id="deckCategory">
                            <el-option disabled>Pick a category</el-option>
                            <el-option
                                v-for="category of categories"
                                :key="category"
                                :value="category"
                            >
                                {{ category }}</el-option
                            >
                        </el-select>
                    </div>

                    <div>
                        <label for="deckDescription">Deck description</label>
                        <el-input
                            v-model="form.description"
                            id="deckDescription"
                            type="textarea"
                        />
                    </div>
                    <p
                        :class="
                            this.descriptionErr
                                ? 'error-msg'
                                : 'error-msg-empty'
                        "
                    >
                        {{ this.descriptionErr }}
                    </p>

                    <div class="toggle-privacy">
                        <label for="privacy">Deck privacy</label>
                        <input
                            type="checkbox"
                            id="privacy"
                            v-model="form.private"
                            @click="this.privacy = !this.privacy"
                        />
                    </div>
                </div>

                <div class="btns-modal-form pop-update-foot">
                    <button type="button" @click="$emit('clicked', false)">
                        Close
                    </button>
                    <button type="submit" @click="updateDeck">
                        Update deck
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { URI, axios } from "@/plugins/index.js";
import Feedback from "@/components/Feedback.vue";

export default {
    name: "PopDecks",
    props: ["deck"],
    emits: ["clicked", "deletion", "cards"],
    components: {
        Feedback,
    },

    data() {
        return {
            form: {
                name: "",
                category: "",
                private: "",
                description: "",
            },
            categories: [
                "Language",
                "Mathematics",
                "Science",
                "History",
                "Geography",
                "Literature",
                "Culture",
                "Other",
            ],
            nameError: "",
            descriptionErr: "",
            privacy: "",
            windowWidth: 0,
            saved: false,
        };
    },

    mounted() {
        this.data();
    },

    created() {
        window.addEventListener("resize", this.myEventHandler);
    },
    beforeUpdate() {
        this.windowWidth = window.innerWidth;
    },
    unmounted() {
        window.removeEventListener("resize", this.myEventHandler);
    },

    methods: {
        data() {
            let data = JSON.parse(JSON.stringify(this.$props.deck));
            this.form.deck_id = data.deck._id;
            this.form.name = data.deck.name;
            this.form.category = data.deck.category;
            this.form.private = !data.deck.private;
            this.privacy = data.deck.private;
            this.form.description = data.deck.description;
        },

        outsider() {
            if (event.target.id == "popMenu") this.$emit("clicked", false);
        },

        async updateDeck() {
            if (this.form.name.length < 6) {
                this.nameError = "Deck's name must be 6 characters long";
            } else if (!this.privacy && this.form.description.length < 10) {
                this.descriptionErr =
                    "Enter at least 10 characters to set it public";
            } else {
                this.form.private = this.privacy;
                if (this.form.description.length < 1)
                    this.form.description = null;
                let json = JSON.stringify(this.form);

                this.form.private = !this.privacy;

                await axios
                    .put(`${URI}/decks/${localStorage.getItem("_id")}`, json, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "token"
                            )}`,
                            "Content-Type": "application/json",
                        },
                    })
                    .then((res) => {
                        if (res.status === 200) {
                            this.nameError = "";
                            this.$emit(
                                "update-deck",
                                JSON.parse(JSON.stringify(this.form)),
                                this.$props.deck.deck.index
                            );
                            this.feedback();
                        }
                    })
                    .catch((error) => {
                        console.log(error);
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

<style lang="scss">
.pop-menu {
    position: fixed;
    top: 0;
    right: 0;
    height: 100%;
    background-color: #22222266;
    width: 100%;
    display: grid;
    justify-items: center;
    padding: 0px 15px;
    z-index: 999;

    &-holder {
        width: 100%;
        background-color: white;
        margin: auto 15px;

        img {
            width: 100%;
            height: 120px;
            object-fit: cover;
            object-position: 0 19%;
            border-bottom: 1px solid #22222222;
        }
    }
}

.pop-update-top {
    padding: 1.5rem 0 0.75rem 1.5rem;

    h4 {
        padding-bottom: 0.25rem;
    }
    p {
        color: #c8c8c8;
    }
}

.pop-update-form {
    padding: 30px 30px 15px 30px;

    div {
        display: grid;
    }
    div label {
        color: #8a8d90;
        font-size: 14px;
        padding-bottom: 5px;
    }
    .deck-category {
        padding-bottom: 28px;
    }
    .toggle-privacy {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .el-input__inner,
    .el-textarea textarea {
        border-radius: 0px;
        box-shadow: none !important;
        border: 1.5px solid #ddd;

        &:focus,
        &:hover,
        .el-select:hover:not(.el-select--disabled) .el-input__inner {
            box-shadow: none !important;
            border-color: #0079c2cc;
        }
    }
}

.pop-update-foot {
    width: 100%;
}

.two-sided {
    display: grid;
    grid-template-columns: 1fr 1fr;
    max-width: 600px;

    img {
        height: 100%;
        border-right: 1px solid #ddd;
        background-color: #fffffc;
        object-position: 10% 19%;
    }
}
</style>
