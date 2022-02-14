<template>
    <h1>Kram</h1>

    <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/users">Users</router-link>
    </div>

  <router-view/>
</template>

<script>

export default {
  components: {}
}
</script>

<style lang="scss">
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        text-align: center;
        margin-top: 60px;
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        a{
            color: #42b883;
        }
    }
</style>
