<template>
    <div class="" id="signout">
        <h1>Signout</h1>
    </div>
</template>

<script>
    export default {
        name: 'Signout',
        
        data () {
            return {}
        },

        mounted () {
            this.redirect();
        },

        methods: {
            redirect(){
                if (!localStorage.getItem('token')) {
                    this.$router.push({ path : `/` });
                }
            },
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>