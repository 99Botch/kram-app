<template>
    <div class="feedback">
        <p>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.5858 13.4142L7.75735 10.5858L6.34314 12L10.5858 16.2427L17.6568 9.1716L16.2426 7.75739L10.5858 13.4142Z"
                    fill="currentColor" />
            </svg>
            Saved
        </p>
    </div>

</template>

<script>

    export default {
        name: 'Feedback',
        
        data () {
            return {
            }
        },

        methods: {

        }
    }
</script>


<style scoped lang="scss">

    .feedback{
        position: fixed;
        background-color: #0079C2;
        color: white;
        padding: 6px 10px;
        bottom: 0;
        margin-bottom: 50px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 99;
        p{
            display: flex;
            align-items: center;
        }
        svg{
            margin-right: 5px;
            width: 20px;
        }
    }


</style>