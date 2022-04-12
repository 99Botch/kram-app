<template>
    <router-view/>
</template>

<script>
    import 'element-plus/es/components/button/style/css'
    // import 'element-plus/es/components/container/style/css'

    export default {
        components: {},
    }
</script>

<style lang="scss">

@import "@/scss/components/_form.scss";
@import "@/scss/components/_mainHolder.scss";
@import "@/scss/components/_animated.scss";

    *{
        padding: 0;
        margin: 0;
        box-sizing: border-box;

        h1{
            font-size: 48px;
            font-weight: 400;
        }

        h2{
            font-size: 36px;
            font-weight: 400;
        }

        h3{
            font-size: 30px;
            font-weight: 600;
        }

        h4{
            font-size: 24px;
            font-weight: 400;
        }

        h5{
            font-size: 18px;
            font-weight: 400;
        }

        h6{
            font-size: 16px;
            font-weight: 600;
            text-transform: uppercase;
        }

        a, p{
            font-size: 16px;
        }
        .sub-header{
            font-size: 14px;
            text-transform: uppercase;
            font-weight: 600;
        }
    }
    
    body{
        overflow-x: hidden;
    }

    #app, a, p, h1, h2, h3, h4, h5, h6 {
        font-family: Arial;
    }
</style>
