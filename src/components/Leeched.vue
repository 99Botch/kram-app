<template>
    <div class="feedback">
        <p>Card larked as leech</p>
    </div>
</template>

<script>
export default {
    name: "Leeched",

    data() {
        return {};
    },
};
</script>

<style scoped lang="scss">
.feedback {
    position: fixed;
    background-color: #dd4947;
    color: white;
    padding: 6px 10px;
    bottom: 0;
    margin-bottom: 100px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1999;
    p {
        display: flex;
        align-items: center;
    }
    svg {
        margin-right: 5px;
        width: 20px;
    }
}
</style>
