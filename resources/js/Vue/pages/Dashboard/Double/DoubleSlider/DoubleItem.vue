<template>
    <li :class="['double-item', this.color].join(' ')">
        <svg-vue :icon="`bet-icons/bet-${this.color}`" />
    </li>
</template>

<script>
export default {
    props: {
        color: String,
        index: Number,
    },
}
</script>

<style lang="scss" scoped>
@import 'resources/assets/sass/_variables';

.double-item {
    height: 40px;
    width: 40px;
    max-height: 40px;
    max-width: 40px;
    border-radius: 5px;
    margin: 0 5px;

    padding: 2px 5px;

    display: flex;
    align-items: center;
    justify-content: center;

    svg {
        width: 100%;
        height: 100%;
    }

    &.blue {
        background-color: $coin-main-blue;
        fill: #fff;
    }

    &.green {
        background-color: $main-green;
        fill: #fff;
    }

    &.gold {
        background-color: $main-yellow;
    }
}

</style>
