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
                    </router-link>
                </div>
                <div id="login">
                    <button @click="displayLogin" class="hoverline">Sign in</button>
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
#home-page {
    // background-image: url('~@/assets/pexels-vlada-karpovich-4939620.jpg');
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
        &:hover{
        background: linear-gradient(6deg, #0080cf 0%, #2ebf96 100%);
        }
    }
}

$whitey: #f0f0f0;

$duration: .2s;
$distance: 8px;
$easeOutBack: cubic-bezier(0.175, 0.885, 0.320, 1.275);

.hoverline {
  color: $whitey;
  position: relative;
  text-decoration: none;
  padding-bottom: 8px;

   &:before,
	&:after {
		content: '';
		position: absolute;
		bottom: 2px;
		left: 0; right: 0;
		height: 2px;
		background-color: $whitey;
	}
	&:before {
		opacity: 0;
		transform: translateY(- $distance);
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
			transition: transform 0s $duration $easeOutBack, opacity 0s $duration;
		}
	}
}
</style>
