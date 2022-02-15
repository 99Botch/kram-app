<template>

    <h2>Navigation</h2>
    <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/users">Users</router-link>
    </div>

  <router-view/>
</template>

<script>

export default {
    name: 'Navigation',
    components: {}
}
</script>

<style scoped lang="scss">
    a{
        color: #42b883;
    }
</style>
