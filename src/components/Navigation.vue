<template>
    <nav>
        <div id="logo">
            <router-link to="/">
                <img src="@/assets/Logo.svg" class="desktop" />
                <img src="@/assets/minified.svg" class="mobile" />
            </router-link>
        </div>

        <div class="search-bar">
            <div>
                <svg
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    id="lense"
                >
                    <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        id="lensePath"
                        fill="#22222288"
                        d="M18.319 14.4326C20.7628 11.2941 20.542 6.75347 17.6569 3.86829C14.5327 0.744098 9.46734 0.744098 6.34315 3.86829C3.21895 6.99249 3.21895 12.0578 6.34315 15.182C9.22833 18.0672 13.769 18.2879 16.9075 15.8442C16.921 15.8595 16.9351 15.8745 16.9497 15.8891L21.1924 20.1317C21.5829 20.5223 22.2161 20.5223 22.6066 20.1317C22.9971 19.7412 22.9971 19.1081 22.6066 18.7175L18.364 14.4749C18.3493 14.4603 18.3343 14.4462 18.319 14.4326ZM16.2426 5.28251C18.5858 7.62565 18.5858 11.4246 16.2426 13.7678C13.8995 16.1109 10.1005 16.1109 7.75736 13.7678C5.41421 11.4246 5.41421 7.62565 7.75736 5.28251C10.1005 2.93936 13.8995 2.93936 16.2426 5.28251Z"
                    />
                </svg>
            </div>
            <input
                type="text"
                placeholder="Search "
                id="searchBar"
                @keyup="searchItem"
                v-model="searchInput"
            />
        </div>

        <div class="left-side">
            <img
                v-if="this.$props.picUrl"
                :src="this.$props.picUrl"
                @click="profile($event)"
            />
            <img
                v-else
                src="@/assets/User.svg"
                class="no-pic"
                @click="profile($event)"
            />
        </div>
    </nav>
</template>

<script>
import { URI, axios } from "@/plugins/index.js";

export default {
    name: "Navigation",
    props: ["picUrl", "search"],
    components: {},

    data() {
        return {
            page: "",
            searchInput: "",
            searching: this.$props.search,
        };
    },

    watch: {
        searching: function () {
            this.$props.search ? console.log(true) : null;
        },
    },

    mounted() {
        this.getSession();
        this.setSession();
    },

    computed: {
        signIn() {
            // get state
            return this.$store.getters.getSession;
        },
    },

    beforeUpdate() {
        this.$props.search ? (this.searchInput = "") : null;
        this.searchInput != ""
            ? document.getElementById("lensePath").setAttribute("fill", "#222")
            : (document
                  .getElementById("lensePath")
                  .setAttribute("fill", "#22222288"),
              this.searchItem());
    },

    methods: {
        async getSession() {
            let id = localStorage.getItem("_id");

            if (id) {
                await axios
                    .get(`${URI}/users/session/${id}`)
                    // .then(response => {
                    //     console.log(response)
                    // })
                    .catch((error) => {
                        console.log(error);
                        localStorage.removeItem("_id");
                        localStorage.setItem("session", false);
                        this.$store.dispatch("signIn", false);
                    });
            }
        },

        setSession() {
            var session = localStorage.getItem("session");
            session === "false"
                ? this.$store.dispatch("signIn", false)
                : this.$store.dispatch("signIn", true);
        },

        profile() {
            this.$emit("clicked", "profile");
        },

        async searchItem() {
            let msg, url;

            localStorage.getItem("page") == "deck"
                ? ((msg = "my_decks"), (url = "decks"))
                : localStorage.getItem("page") == "repository"
                ? ((msg = "repository"), (url = "decks/repository"))
                : ((msg = "cards"), (url = "cards"));

            await axios
                .get(
                    `${URI}/${url}/${event.target.value}/${localStorage.getItem(
                        "_id"
                    )}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "token"
                            )}`,
                        },
                    }
                )
                .then(async (res) => {
                    console.log("bite");
                    let found_decks = await res.data;
                    let i = 0;
                    found_decks.forEach((deck) => (deck.index = i++));
                    this.$emit("keyup", found_decks, msg);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    },
};
</script>

<style scoped lang="scss">
nav {
    display: grid;
    align-items: center;
    border-bottom: 1px solid #dddddd;
    box-shadow: 0px 1.1px 1.4px -16px rgba(0, 0, 0, 0.028),
        0px 3.8px 4.7px -16px rgba(0, 0, 0, 0.042),
        0px 17px 21px -16px rgba(0, 0, 0, 0.07);
    position: sticky;
    top: 0;
    background-color: white;
    z-index: 199;

    div {
        height: 100%;
        display: flex;
        align-items: center;
    }

    #logo {
        justify-content: center;
    }
}

.search-bar input {
    height: 100%;
    width: 100%;
    border-width: 0px;
    outline: none;
    color: #333;
}

.left-side {
    display: flex;
    justify-content: flex-end;
    img {
        width: 35px;
        height: 35px;
        border-radius: 50px;
        object-fit: cover;
        cursor: pointer;
    }
}

.no-pic {
    border: 1px solid #c8c8c8;
}

input::-webkit-input-placeholder {
    color: #22222288;
    opacity: 1;
}
input::-moz-placeholder {
    color: #22222288;
    opacity: 1;
}
input::-ms-placeholder {
    color: #22222288;
    opacity: 1;
}
input::placeholder {
    color: #22222288;
    opacity: 1;
}

@media (max-width: 480px) {
    nav {
        grid-template-columns: 50px 1fr 15%;
        height: 50px;

        .mobile {
            display: flex;
            justify-content: center;
            height: 30px;
        }
        .left-side {
            display: flex;
            justify-content: center;
        }
        .desktop {
            display: none;
        }
    }
    .search-bar {
        div {
            padding: 0px 7px;
        }
        input {
            font-size: 14px;
        }
        #lense {
            width: 18px;
        }
    }
}

@media (max-width: 480px) {
    .left-side img {
            width: 30px;
            height: 30px;
    }
}

@media (min-width: 480px) {
    nav {
        grid-template-columns: 150px 1fr 15%;
        height: 78px;

        .mobile {
            display: none;
        }
        .left-side {
            padding-right: 35px;
        }
    }

    .search-bar {
        div {
            padding: 0px 7px 0px 15px;
        }
        input {
            font-size: 18px;
        }
        #lense {
            width: 22px;
        }
    }
}
</style>
