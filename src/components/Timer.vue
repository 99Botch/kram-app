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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    @media (min-width: 480px) {
        .timer{
            position: absolute;
            right: 0;
            padding: 25px;
            p{
                font-size: 20px;
            }
            &-end{
                color: #DB3C3A;
            }
        }
    }

</style>
