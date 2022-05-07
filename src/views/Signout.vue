<!-- 
    There is nothing special here other than the compoents prompts when users logout
-->

<template>
    <div class="" id="signout">
        <h1>Signout</h1>
    </div>
</template>

<script>
export default {
    name: "Signout",

    mounted() {
        this.redirect();
    },

    methods: {
        redirect() {
            if (!localStorage.getItem("token")) {
                this.$router.push({ path: `/` });
            }
        },
    },
};
</script>

<style scoped lang="scss"></style>
