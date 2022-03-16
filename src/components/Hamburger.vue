<template>

    <div class="menu">
        <div class="menu-sub">
            <img  src="@/assets/tab.svg"  @click="switchPageMobile($event)" class="frgDeck"/> 
            <img @click="switchPageMobile($event)" src="@/assets/transcript.svg" class="frgCard" /> 
            <Logout />
        </div>
    </div>

</template>

<script>
    import Logout from '@/components/Logout.vue';

    export default {
        name: 'Hamburger',

        data() {
            return {
            }
        },

        components: {
            Logout,
        },

        mounted () {},

        computed: {},

        methods: {
            switchPageMobile(){
                (event.target.className == "frgDeck") ? this.$emit('clicked', 'Decks') : this.$emit('clicked', 'Cards');
            },
        },

    }
</script>


<style scoped lang="scss">
    .menu{
        position: absolute;
        bottom: 0;
        right: 0;
        width: 175px;
        height: auto;
        margin-right: 25px;
        margin-bottom: 55px;
        border-radius: 15px;
        background-color: #DDD6;
        border-radius: 20px;
        padding: 5px 25px;

        &-sub{
            display: flex;
            justify-content: space-around;
        }
        img{
            height: 25px;
        }
    }

</style>
