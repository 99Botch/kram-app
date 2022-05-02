<template>
    <div
        class="form-pop"
        @keypress.enter="submitForm"
        @click="outsider"
        id="RegisterForm"
    >
        <div class="form-modal" id="registerBox">
            <div class="close-form">
                <img src="@/assets/close-o.svg" @click="closeForm" />
            </div>

            <div class="log-credits">
                <h4>Create account</h4>
            </div>

            <div>
                <form>
                    <p class="form-error" id="registerUsernameError">
                        {{ this.usernameError }}
                    </p>
                    <input
                        type="text"
                        id="usernameRegister"
                        name="username"
                        v-model="form.username"
                        placeholder="Username"
                        v-on:keyup="
                            validation();
                            usernameValidation();
                        "
                        class="log"
                    /><br />

                    <p class="form-error" id="registerMailError">
                        {{ this.emailError }}
                    </p>
                    <input
                        type="text"
                        id="emailRegister"
                        name="email"
                        v-model="form.email"
                        placeholder="Mail address"
                        v-on:keyup="
                            validation();
                            mailValidation();
                        "
                        class="log"
                    /><br />

                    <p class="form-error" id="registerPassError">
                        {{ this.passError }}
                    </p>
                    <input
                        type="password"
                        id="passwordRegister"
                        name="password"
                        v-model="form.password"
                        placeholder="Password"
                        v-on:keyup="
                            validation();
                            passValidation();
                        "
                        class="log"
                    /><br />

                    <p class="form-error" id="registerRePassError">
                        {{ this.rePassError }}
                    </p>
                    <input
                        type="password"
                        id="rePassRegister"
                        name="repeat_password"
                        v-model="form.repeat_password"
                        placeholder="Confirm Password"
                        v-on:keyup="
                            validation();
                            rePassValidation();
                        "
                        class="log"
                    /><br />

                    <br />
                </form>

                <div class="form-modal-btn">
                    <p class="form-error" id="registerFormError">
                        {{ this.formError }}
                    </p>
                    <button
                        class="submit"
                        id="submitRegister"
                        type="submit"
                        @click="submitForm"
                        disabled
                    >
                        Register
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { URI, axios, validator } from "@/plugins/index.js";

export default {
    name: "Register",

    data() {
        return {
            form: {
                username: "",
                email: "",
                password: "",
                repeat_password: "",
            },
            usernameError: "",
            emailError: "",
            passError: "",
            rePassError: "",
            formError: "",
        };
    },

    methods: {
        async submitForm() {
            const json = JSON.stringify(this.form);

            await axios
                .post(`${URI}/users/register`, json, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                .then((res) => {
                    if (res.status === 200) {
                        this.$router.go({ path: "/" });
                    }
                })
                .catch((error) => {
                    if (error.response.data.type == "string.empty") {
                        this.formError = "Make sure you fill in all the form";
                    } else {
                        this.formError = "Username or email already taken";
                    }
                });
        },

        outsider(e){
            if (e.target.id == 'RegisterForm') this.$emit('clicked', 'CloseRegister')
        },

        // CLOSE FORM
        closeForm() {
            this.$emit("clicked", "CloseRegister");
        },

        // FORM VALIDATION
        validation() {
            if (
                document.getElementById("emailRegister").value.length != 0 &&
                document.getElementById("usernameRegister").value.length != 0 &&
                document.getElementById("passwordRegister").value.length != 0 &&
                document.getElementById("rePassRegister").value.length != 0
            ) {
                document.getElementById("submitRegister").disabled = false;
            } else {
                document.getElementById("submitRegister").disabled = true;
            }
        },
        mailValidation() {
            let [length, format, error, warning, initial] = [
                document.getElementById("emailRegister").value.length,
                validator.validate(this.form.email),
                document.getElementById("registerMailError"),
                "#FFA500",
                "#DB3C3A",
            ];

            length == 0
                ? ((this.emailError = "Enter your mail address"),
                  (error.style.color = initial))
                : length > 1 && !format
                ? ((this.emailError = "Enter a valid mail address"),
                  (error.style.color = warning))
                : (this.emailError = "");
        },
        usernameValidation() {
            let [length, error, warning, initial] = [
                document.getElementById("usernameRegister").value.length,
                document.getElementById("registerUsernameError"),
                "#FFA500",
                "#DB3C3A",
            ];

            length == 0
                ? ((this.usernameError = "Enter a username"),
                  (error.style.color = initial))
                : length < 6
                ? ((this.usernameError =
                      "Username must be at least 6 characters"),
                  (error.style.color = warning))
                : length > 99
                ? ((this.usernameError =
                      "Username cannot exceed 99 characters"),
                  (error.style.color = warning))
                : (this.usernameError = "");
        },
        passValidation() {
            let [length, error, warning, initial] = [
                document.getElementById("passwordRegister").value.length,
                document.getElementById("registerPassError"),
                "#FFA500",
                "#DB3C3A",
            ];

            length == 0
                ? ((this.passError = "Enter a password"),
                  (error.style.color = initial))
                : length < 8
                ? ((this.passError = "Password must be at least 8 characters"),
                  (error.style.color = warning))
                : (this.passError = "");
        },
        rePassValidation() {
            let [error, main, copy, warning, initial] = [
                document.getElementById("registerRePassError"),
                this.form.password,
                this.form.repeat_password,
                "#FFA500",
                "#DB3C3A",
            ];

            main !== copy
                ? ((this.rePassError =
                      "Password and Confirm password must be match"),
                  (error.style.color = warning))
                : ((this.rePassError = ""), (error.style.color = initial));
        },
    },
};
</script>

<style scoped lang="scss">
form {
    display: flex;
    flex-direction: column;
}

#registerFormError {
    padding-left: 20px;
}
</style>
