<template>
    <div>
        <span v-if="login">
            <Login @clicked="closeForm" />
        </span>

        <span v-if="register">
            <Register @clicked="closeForm" />
        </span>

        <div class="" id="home-page">
            <div id="home-nav">
                <div id="home-btn">
                    <router-link to="/">
                        <img src="@/assets/Logo.svg" />
                        <p class="app-name">Kram</p>
                    </router-link>
                </div>
                <div id="login">
                    <button @click="displayLogin" class="hoverline">
                        Sign in
                    </button>
                </div>
            </div>

            <div id="home-main">
                <h1>Unfold Memory</h1>
                <button class="register-btn" @click="displayRegister">
                    Create account
                </button>
                <button class="login-btn" @click="displayLogin">Log in</button>
            </div>
        </div>
    </div>

    <div class="description">
        <div class="triangle-isosceles top"></div>

        <div class="description-prg drp-one">
            <svg
                class="bulb"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M4 9C4 11.9611 5.60879 14.5465 8 15.9297V15.9999C8 18.2091 9.79086 19.9999 12 19.9999C14.2091 19.9999 16 18.2091 16 15.9999V15.9297C18.3912 14.5465 20 11.9611 20 9C20 4.58172 16.4183 1 12 1C7.58172 1 4 4.58172 4 9ZM16 13.4722C17.2275 12.3736 18 10.777 18 9C18 5.68629 15.3137 3 12 3C8.68629 3 6 5.68629 6 9C6 10.777 6.7725 12.3736 8 13.4722L10 13.4713V16C10 17.1045 10.8954 17.9999 12 17.9999C13.1045 17.9999 14 17.1045 14 15.9999V13.4713L16 13.4722Z"
                    fill="currentColor"
                />
                <path
                    d="M10 21.0064V21C10.5883 21.3403 11.2714 21.5351 12 21.5351C12.7286 21.5351 13.4117 21.3403 14 21V21.0064C14 22.111 13.1046 23.0064 12 23.0064C10.8954 23.0064 10 22.111 10 21.0064Z"
                    fill="currentColor"
                />
            </svg>
            <p>
                Kram is a web application that will help you memorize easily
                information
            </p>
        </div>

        <div class="p-card parallax"></div>

        <div class="description-prg drp-two">
            <p>
                <svg
                    class="pen"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M21.2635 2.29289C20.873 1.90237 20.2398 1.90237 19.8493 2.29289L18.9769 3.16525C17.8618 2.63254 16.4857 2.82801 15.5621 3.75165L4.95549 14.3582L10.6123 20.0151L21.2189 9.4085C22.1426 8.48486 22.338 7.1088 21.8053 5.99367L22.6777 5.12132C23.0682 4.7308 23.0682 4.09763 22.6777 3.70711L21.2635 2.29289ZM16.9955 10.8035L10.6123 17.1867L7.78392 14.3582L14.1671 7.9751L16.9955 10.8035ZM18.8138 8.98525L19.8047 7.99429C20.1953 7.60376 20.1953 6.9706 19.8047 6.58007L18.3905 5.16586C18 4.77534 17.3668 4.77534 16.9763 5.16586L15.9853 6.15683L18.8138 8.98525Z"
                        fill="currentColor"
                    />
                    <path
                        d="M2 22.9502L4.12171 15.1717L9.77817 20.8289L2 22.9502Z"
                        fill="currentColor"
                    />
                </svg>
                Kram utilizes a new kind of spaced repetition algorithm. Review
                information only when you need it. First learn properly your
                card and then review it right before you forget it
            </p>
        </div>

        <div class="p-card-2 parallax"></div>

        <div class="description-prg drp-three">
            <p>
                <svg
                    class="tree"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M9 1H1V9H9V6H11V20H15V23H23V15H15V18H13V6H15V9H23V1H15V4H9V1ZM21 3H17V7H21V3ZM17 17H21V21H17V17Z"
                        fill="currentColor"
                    />
                </svg>
                Use Kram repository to get decks and cards from other users and
                upload yours to share them to the world
            </p>
        </div>
    </div>
</template>

<script>
import Login from "@/components/Login.vue";
import Register from "@/components/Register.vue";

export default {
    data() {
        return {
            login: false,
            register: false,
        };
    },

    components: {
        Login,
        Register,
    },

    mounted() {
        this.redirect();
    },

    methods: {
        redirect() {
            if (localStorage.getItem("token")) {
                this.$router.push({ path: `/kram` });
            }
        },
        displayLogin() {
            this.login = true;
        },
        displayRegister() {
            this.register = true;
        },
        closeForm(_event) {
            _event == "CloseLogin"
                ? (this.login = false)
                : _event == "CloseRegister"
                ? (this.register = false)
                : _event == "Switch"
                ? ((this.login = false), (this.register = true))
                : null;
        },
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@media (max-width: 600px) {
    .app-name {
        display: none;
    }
}

.drp-two {
    background-color: #0084c4;
    color: white;
}
.drp-three {
    background-color: #3658b9;
    color: white;
}
.p-card {
    background-image: url("~@/assets/network.jpg");
}
.p-card-2 {
    background-image: url("~@/assets/review.jpg");
}
.parallax {
    height: 300px;
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}
.description {
    position: relative;

    &-prg {
        display: flex;
        justify-content: center;
        position: relative;
        padding: 0 15px;
    }
    svg {
        position: absolute;
        top: 50%;
        left: 50%;
    }
    .bulb {
        transform: translate(-50%, -200%);
    }
    .pen {
        transform: translate(-50%, -275%);
    }
    .tree {
        transform: translate(-50%, -250%);
    }
    p {
        display: flex;
        align-items: center;
        text-align: center;
        height: 300px;
        width: 60ch;
    }
}
#home-page {
    background: linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15)),
        url("~@/assets/pexels-vlada-karpovich-4939620.jpg");
    height: 100vh;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    display: flex;
    flex-direction: column;

    h1 {
        color: #fff;
        font-weight: 600;
    }
}
.triangle-isosceles {
    width: 100%;
    display: flex;
    justify-content: center;
}
.triangle-isosceles:before {
    content: "";
    position: absolute;
    bottom: 100%;
    border-width: 20px 20px 0; /* vary these values to change the angle of the vertex */
    border-style: solid;
    transform: rotate(180deg);
    border-color: white transparent;
    /* reduce the damage in FF3.0 */
    display: block;
    width: 0;
}

.register-btn {
    text-decoration: none;
    color: #fff;
    padding: 15px 0px;
    width: 240px;
    text-align: center;
    border-radius: 25px;
    background: rgb(0, 121, 194);
    background: linear-gradient(
        6deg,
        rgba(0, 121, 194, 1) 0%,
        rgba(41, 171, 135, 1) 100%
    );
    cursor: pointer;
    border: 0;
}

.login-btn {
    text-decoration: none;
    color: #fff;
    padding: 15px 0px;
    width: 240px;
    text-align: center;
    border-radius: 25px;
    border: 2px solid #fff;
    background-color: transparent;
}

#home-main {
    display: flex;
    flex-direction: column;
    flex: 1;
    align-items: center;
    justify-content: center;
}

@media (max-width: 480px) {
    #home-page {
        h1 {
            font-size: 36px;
            font-style: italic;
            padding-bottom: 75%;
        }
    }
    #login {
        display: none;
    }
    #home-btn {
        padding: 15px 20px;
    }
    .register-btn {
        margin-bottom: 15px;
    }
}

@media (min-width: 480px) {
    #home-page h1 {
        padding-bottom: 15px;
    }
    .login-btn {
        display: none;
    }
    #home-main {
        margin-bottom: 10%;
    }

    #home-nav {
        display: grid;
        justify-content: center;
        grid-template-columns: 175px 1fr;
        height: 78px;

        div {
            display: flex;
            align-items: center;
        }
        #home-btn {
            justify-content: center;
            a {
                display: flex;
                align-items: center;
                text-decoration: none;
                img {
                    width: 40px;
                }
                p {
                    margin-left: 10px;
                    color: black;
                    font-size: 28px;
                    font-weight: 300;
                    font-family: sans-serif;
                }
            }
        }
    }

    #login {
        justify-content: right;
        padding-right: 30px;
        button {
            color: #f0f0f0;
            text-decoration: none;
            font-size: 18px;
            background-color: transparent;
            outline: 0;
            cursor: pointer;
            border: 0;
        }
    }
    .register-btn {
        margin-bottom: 15px;
        &:hover {
            background: linear-gradient(6deg, #0080cf 0%, #2ebf96 100%);
        }
    }
}

$whitey: #f0f0f0;

$duration: 0.2s;
$distance: 8px;
$easeOutBack: cubic-bezier(0.175, 0.885, 0.32, 1.275);

.hoverline {
    color: $whitey;
    position: relative;
    text-decoration: none;
    padding-bottom: 8px;

    &:before,
    &:after {
        content: "";
        position: absolute;
        bottom: 2px;
        left: 0;
        right: 0;
        height: 2px;
        background-color: $whitey;
    }
    &:before {
        opacity: 0;
        transform: translateY(-$distance);
        transition: transform 0s $easeOutBack, opacity 0s;
    }
    &:after {
        opacity: 0;
        transform: translateY($distance/2);
        transition: transform $duration $easeOutBack, opacity $duration;
    }
    &:hover,
    &:focus {
        &:before,
        &:after {
            opacity: 1;
            transform: translateY(0);
        }
        &:before {
            transition: transform $duration $easeOutBack, opacity $duration;
        }
        &:after {
            transition: transform 0s $duration $easeOutBack,
                opacity 0s $duration;
        }
    }
}
</style>
