<template>
    <Navigation/>

    <div class="" id="home_view">
        <h1>Welcome to Kram</h1>
        <p>{{ $store.state.login }} </p>
        <button @click="$store.dispatch('signIn', !$store.state.login)">login</button>
    </div>

</template>

<script>
    import Navigation from '@/components/Navigation.vue';

    export default {

        data() {
            return {}
        },

        components: {
            Navigation,
        },

        props: {}
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
