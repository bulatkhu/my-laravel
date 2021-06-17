<template>
    <div class="statistic">
        <div class="statistic-col">
            <p class="statistic-col__item">Round statics</p>
        </div>
        <div class="statistic-col">
            <p class="statistic-col__item">participate in <span class="amount">121</span></p>
        </div>
        <div class="statistic-col">
            <p class="statistic-col__item">Participants <span>213</span></p>
            <p class="statistic-col__item">Skins <span>12</span></p>
        </div>

    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.statistic {
    display: flex;
    align-items: center;
    justify-content: space-between;
    //min-height: 60px;

    &-col {
        padding-left: 30px;
        flex-basis: 33.33%;
        display: flex;
        justify-content: space-between;

        &:nth-child(2) {
            justify-content: center;
        }

        &__item {
            text-transform: uppercase;
        }
    }
}

</style>
