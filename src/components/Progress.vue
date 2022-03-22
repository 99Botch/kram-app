<template>

    <p class="save-exit" v-if="message">Save & exit session</p>

    <div class="save-btn" @mouseover="message= !message" @mouseleave="message= !message" @click="$emit('saveAndExit')">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="#FFFFFA" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" 
                d="M4 1.5C2.89543 1.5 2 2.39543 2 3.5V4.5C2 4.55666 2.00236 4.61278 2.00698 4.66825C0.838141 5.07811 0 6.19118 0 7.5V19.5C0 21.1569 1.34315 22.5 3 22.5H21C22.6569 22.5 24 21.1569 24 19.5V7.5C24 5.84315 22.6569 4.5 21 4.5H11.874C11.4299 2.77477 9.86384 1.5 8 1.5H4ZM9.73244 4.5C9.38663 3.9022 8.74028 3.5 8 3.5H4V4.5H9.73244ZM3 6.5C2.44772 6.5 2 6.94772 2 7.5V19.5C2 20.0523 2.44772 20.5 3 20.5H21C21.5523 20.5 22 20.0523 22 19.5V7.5C22 6.94772 21.5523 6.5 21 6.5H3Z"
                fill="#FFFFFA"
            />
        </svg>
        <div class="extra-layer" id="saveAndExit"></div>
    </div>

</template>

<script>

    export default {
        name: 'Progress',

        data() {
            return {
                message: false
            }
        },

        mounted () {},

        computed: {},

        methods: {}
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">


    .extra-layer{
        height: 100%;
        width: 100%;
        background-color: transparent;
        position: absolute;
        border-radius: 50%;
    }



        .save-exit{
            position: fixed;
            bottom: 0;
            right: 0;
            margin-right: 85px;
            background-color: #222;
            padding: 5px 10px;
            font-size: 12px;
            color: #FFFFFA;
            border-radius: 15px;
        }

        .save-btn{
            position: fixed;
            bottom: 0;
            right: 0;
            margin-right: 25px;
            background-color: #DDD;
            padding: 10px;
            border-radius: 100%;
            width: 53px;
            height: 53px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;

            &:hover{
                background-color: #222;
            }
        }

    @media (min-width: 480px) {
        .save-btn{
            background-color: #222;
            margin-bottom: 10%;
        }
    }

    @media (max-width: 1200px) {
        .save-btn{
            margin-bottom: 8%;
        }
        .save-exit{
            display: none
        }
    }

    @media (min-width: 1200px) {
        .save-btn{
            margin-bottom: 34px;
        }
        .save-exit{
            margin-bottom: 47px;
        }
    }

    @media (max-width: 480px) {
        .save-btn{
            background-color: #222;
            margin-bottom: 20%;
        }
    }

    @media (max-height: 560px) {
        .save-btn{
            margin-bottom: 10%;
        }
    }



</style>
