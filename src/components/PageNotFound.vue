<template>
    <div class="" id="page_not_found">
        <h1>Error 404 | Page not found</h1>
        <p>You will be redirected in 5 seconds</p>
    </div>
</template>

<script>
    export default {
        name: 'PageNotFound',
        
        data () {
            return {}
        },

        mounted () {
            this.redirect();
        },

        methods: {
            redirect(){
                let counter = 5;
                const timer = setInterval(() => {
                    counter--;
                    if (counter === 0) {
                        clearInterval(timer);
                        (localStorage.getItem('token')) ? this.$router.push({ path : `/kram` }) : this.$router.push({ path : `/` });
                    }
                }, 1000);
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>