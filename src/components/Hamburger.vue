<template>
    <div class="menu">

        <div class="menu-sub">
            <svg  width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" @click="switchPageMobile($event)" id="frgDeck">
                <path fill-rule="evenodd" clip-rule="evenodd" fill="currentColor"
                    d="M18.9999 4C20.6568 4 21.9999 5.34315 21.9999 7V17C21.9999 18.6569 20.6568 20 18.9999 20H4.99994C3.34308 20 1.99994 18.6569 1.99994 17V7C1.99994 5.34315 3.34308 4 4.99994 4H18.9999ZM19.9999 9.62479H13C12.4478 9.62479 11.8442 9.20507 11.652 8.68732L10.6542 6H4.99994C4.44765 6 3.99994 6.44772 3.99994 7V17C3.99994 17.5523 4.44765 18 4.99994 18H18.9999C19.5522 18 19.9999 17.5523 19.9999 17V9.62479Z"
                />
            </svg>

            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" @click="switchPageMobile($event)" id="frgCard">
                <path d="M5 16C5 15.4477 5.44772 15 6 15H14C14.5523 15 15 15.4477 15 16C15 16.5523 14.5523 17 14 17H6C5.44772 17 5 16.5523 5 16Z" fill="currentColor" />
                <path d="M18 11C18.5523 11 19 11.4477 19 12C19 12.5523 18.5523 13 18 13H10C9.44772 13 9 12.5523 9 12C9 11.4477 9.44772 11 10 11H18Z" fill="currentColor" />
                <path d="M16 16C16 15.4477 16.4477 15 17 15H18C18.5523 15 19 15.4477 19 16C19 16.5523 18.5523 17 18 17H17C16.4477 17 16 16.5523 16 16Z" fill="currentColor" />
                <path d="M7 11C7.55228 11 8 11.4477 8 12C8 12.5523 7.55228 13 7 13H6C5.44772 13 5 12.5523 5 12C5 11.4477 5.44772 11 6 11H7Z" fill="currentColor" />
                <path fill-rule="evenodd" clip-rule="evenodd" fill="currentColor"
                    d="M4 3C2.34315 3 1 4.34315 1 6V18C1 19.6569 2.34315 21 4 21H20C21.6569 21 23 19.6569 23 18V6C23 4.34315 21.6569 3 20 3H4ZM20 5H4C3.44772 5 3 5.44772 3 6V18C3 18.5523 3.44772 19 4 19H20C20.5523 19 21 18.5523 21 18V6C21 5.44771 20.5523 5 20 5Z"
                />
            </svg>

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
                (event.currentTarget.id == "frgDeck") ? this.$emit('clicked', 'deck') : this.$emit('clicked', 'card');
            },
        },

    }
</script>


<style scoped lang="scss">
    .menu{
        position: fixed;
        bottom: 0;
        right: 0;
        height: auto;
        margin-right: 65px;
        margin-bottom: 30px;
        border-radius: 15px;
        background-color: #222;
        border-radius: 20px;
        padding: 5px 25px;

        &-sub{
            display: flex;
        }
        svg{
            margin: 3px 12px;
            color: #FFFFFA;
            &:hover{
                cursor: pointer;
            }
        }
    }

    @media (max-width: 1024px) {
        .menu{
        margin-bottom: 10px;
        }
    }


</style>