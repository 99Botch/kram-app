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


<style lang="scss">
// 	.zoom-up{		
// 		width: 100vw;
// 		height: 100vh;
// 		background-color: #000000AA;
// 		position: fixed;
// 		display: flex;
// 		justify-content: center;
// 		align-items: center;
// 		cursor: pointer;
// 	    & img{
// 			max-height: 95vh;
// 			width: auto;
//             -webkit-tap-highlight-color: transparent;
// 		}
// 	}

//     .gg-close {
//         box-sizing: border-box;
//         display: block;
//         transform: scale(var(--ggs,1));
//         width: 22px;
//         height: 22px;
//         border: 2px solid transparent;
//         border-radius: 40px;
//         color: #FFFFFA;
//         position: fixed;
//         right: 2%;
//         top: 2%;
//     }

//     .gg-close::after,
//     .gg-close::before {
//         content: "";
//         display: block;
//         box-sizing: border-box;
//         position: absolute;
//         width: 16px;
//         height: 2px;
//         background: currentColor;
//         transform: rotate(45deg);
//         border-radius: 5px;
//         top: 8px;
//         left: 1px
//     }

//     .gg-close::after {
//         transform: rotate(-45deg)
//     } 

//     .gg-push-chevron-right {
//         box-sizing: border-box;
//         position: fixed;
//         display: block;
//         transform: scale(var(--ggs,1));
//         width: 22px;
//         height: 22px;
//         border: 2px solid transparent;
//         border-radius: 100px;
//         right: 5%;
//     }

//     .gg-push-chevron-right::after,
//     .gg-push-chevron-right::before {
//         content: "";
//         display: block;
//         box-sizing: border-box;
//         position: absolute;
//         width: 2px;
//         height: 14px;
//         border-right: 2px solid;
//         top: 2px;
//         right: 0;
//         color: #FFFFFA;
//     }

//     .gg-push-chevron-right::after {
//         width: 10px;
//         height: 10px;
//         border-bottom: 2px solid;
//         transform: rotate(-45deg);
//         right: 6px;
//         top: 4px
//     } 

//     .gg-push-chevron-left {
//         box-sizing: border-box;
//         position: fixed;
//         display: block;
//         transform: scale(var(--ggs,1));
//         width: 22px;
//         height: 22px;
//         border: 2px solid transparent;
//         border-radius: 100px;
//         color: #FFFFFA;
//         left: 5%;
//     }

//     .gg-push-chevron-left::after,
//     .gg-push-chevron-left::before {
//         content: "";
//         display: block;
//         box-sizing: border-box;
//         position: absolute;
//         width: 2px;
//         height: 14px;
//         border-left: 2px solid;
//         top: 2px;
//         left: 0
//     }

//     .gg-push-chevron-left::after {
//         width: 10px;
//         height: 10px;
//         border-bottom: 2px solid;
//         transform: rotate(45deg);
//         left: 6px;
//         top: 4px
//     } 
// </style>