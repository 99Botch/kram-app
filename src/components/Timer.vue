<template>
    <div class="timer">
        <p :class="this.timer == '00:00' ? ' timer-end' : '' "> {{ this.timer }} </p>
    </div>
</template>

<script>
    export default {
        name: 'Timer',

        data() {
            return {
                timer: '01:00',
                timeCount: 60,
            }
        },

        components: {},

        mounted () {
            const timer = setInterval(() => {
                this.timeCount--;
                (this.timeCount > 9) ? this.timer = `00:${this.timeCount}` : this.timer = `00:0${this.timeCount}` ;
                if (this.timeCount === 0) {
                    clearInterval(timer);
                }
            }, 1000);
        },
        methods: {},
    }
</script>

<style scoped lang="scss">
        .timer{
            position: absolute;
            right: 0;
            &-end{
                color: #DB3C3A;
            }
        }

    @media (max-width: 480px) {
        .timer{
            padding: 20px;
            p{
                font-size: 18px;
            }
        }
    }

    @media (min-width: 480px) {
        .timer{
            padding: 25px;
            p{
                font-size: 20px;
            }
        }
    }

</style>
