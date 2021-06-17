<template>
    <div class="col-header">
        <span class="col-header__amount amount">{{amount}}$</span>
        <span class="col-header__players">{{players}} Players</span>
        <span :class="['col-header__coef', type]">{{type === "gold" ? "x14" : "x2"}}</span>
    </div>
</template>

<script>
export default {
    props: ["amount", "players", "type"]
}
</script>

<style scoped lang="scss">
@import "resources/assets/sass/_variables";

.col-header {
    padding: 20px;
    background-color: $tertiary-blue;
    border-radius: 10px;
    display: flex;
    margin-bottom: 10px;
    align-items: center;

    &__amount, &__coef, &__players {
        flex-basis: 33.33%;
        display: inline-block;
    }

    &__players {
        text-align: center;
    }

    &__coef {
        text-align: right;
        font-weight: bold;

        &.blue {
            color: $coin-main-blue;
        }
        &.gold {
            color: $main-yellow;
        }
        &.green {
            color: $main-green;
        }
    }
}

</style>
