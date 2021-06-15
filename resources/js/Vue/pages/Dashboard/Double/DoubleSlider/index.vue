<template>
    <div class="double-slide">
        <div class="double-slide__inner">
            <ul
                :style="{ transitionDuration: transitionDuration + 'ms', transform:
                `translateX(calc(-50% + ${(winner * 50) - 25}px))` }"
                class="double-slide__list">
                <DoubleItem color="green" />
                <DoubleItem color="blue" />
                <DoubleItem color="green" />
                <DoubleItem color="blue" />
                <DoubleItem color="green" />
                <DoubleItem color="blue" />
                <DoubleItem color="green" />
                <DoubleItem color="blue" />
                <DoubleItem color="green" />
                <DoubleItem color="gold" />
                <DoubleItem color="green" />
                <DoubleItem color="blue" />
                <DoubleItem color="green" />
                <DoubleItem color="blue" />
                <DoubleItem color="green" />
                <DoubleItem color="blue" />
                <DoubleItem color="green" />
                <DoubleItem color="blue" />
                <DoubleItem color="green" />
                <DoubleItem color="gold" />
                <DoubleItem color="green" />
                <DoubleItem color="blue" />
                <DoubleItem color="green" />
                <DoubleItem color="blue" />
                <DoubleItem color="green" />
                <DoubleItem color="blue" />
                <DoubleItem color="green" />
                <DoubleItem color="blue" />
                <DoubleItem color="green" />
                <DoubleItem color="gold" /><DoubleItem color="green" />
                <DoubleItem color="blue" />
                <DoubleItem color="green" />
                <DoubleItem color="blue" />
                <DoubleItem color="green" />
                <DoubleItem color="blue" />
                <DoubleItem color="green" />
                <DoubleItem color="blue" />
                <DoubleItem color="green" />
                <DoubleItem color="gold" />
                <DoubleItem color="green" />
                <DoubleItem color="blue" />
                <DoubleItem color="green" />
                <DoubleItem color="blue" />
                <DoubleItem color="green" />
                <DoubleItem color="blue" />
                <DoubleItem color="green" />
                <DoubleItem color="blue" />
                <DoubleItem color="green" />
                <DoubleItem color="gold" />
                <DoubleItem color="green" />
                <DoubleItem color="blue" />
                <DoubleItem color="green" />
                <DoubleItem color="blue" />
                <DoubleItem color="green" />
                <DoubleItem color="blue" />
                <DoubleItem color="green" />
                <DoubleItem color="blue" />
                <DoubleItem color="green" />
                <DoubleItem color="gold" /><DoubleItem color="green" />
                <DoubleItem color="blue" />
                <DoubleItem color="green" />
                <DoubleItem color="blue" />
                <DoubleItem color="green" />
                <DoubleItem color="blue" />
                <DoubleItem color="green" />
                <DoubleItem color="blue" />
                <DoubleItem color="green" />
                <DoubleItem color="gold" />
                <DoubleItem color="green" />
                <DoubleItem color="blue" />
                <DoubleItem color="green" />
                <DoubleItem color="blue" />
                <DoubleItem color="green" />
                <DoubleItem color="blue" />
                <DoubleItem color="green" />
                <DoubleItem color="blue" />
                <DoubleItem color="green" />
                <DoubleItem color="gold" />
                <DoubleItem color="green" />
                <DoubleItem color="blue" />
                <DoubleItem color="green" />
                <DoubleItem color="blue" />
                <DoubleItem color="green" />
                <DoubleItem color="blue" />
                <DoubleItem color="green" />
                <DoubleItem color="blue" />
                <DoubleItem color="green" />
                <DoubleItem color="gold" />
            </ul>
        </div>
    </div>
</template>

<script>
import DoubleItem from './DoubleItem'

// const randomInteger = (min, max) => {
//     const rand = min + Math.random() * (max + 1 - min);
//     return Math.floor(rand);
// }

export default {
    components: {DoubleItem},
    data() {
        return {
            winner: 0,
            transitionDuration: 5000,
        }
    },
    sockets: {
        startDouble(data) {
            this.transitionDuration = 0
            this.winner = 0
            console.log("startDouble data", data);
        },
        endDouble({ winner, rollingAt, endAt }){
            console.log("double data", winner, Date.parse(endAt)  - Date.parse(rollingAt));
            this.transitionDuration = Date.parse(endAt)  - Date.parse(rollingAt)
            this.winner = winner;
            console.log("");
        }
    }
    // mounted() {
        // setInterval(() => {
        //     const date = Date.now();
        //     const winner = randomInteger(1, 30);
        //     console.log("winner", winner);
        //     console.log("date", date);
        // }, 1000)
    // }
}
</script>

<style lang="scss" scoped>
@import "resources/assets/sass/_variables";

.double-slide {
    padding: 10px;
    border-radius: 10px;
    background-color: $main-blue;
    max-width: 100%;
    position: relative;

    display: flex;

    &:before {
        content: "";
        position: absolute;
        width: 4px;
        background-color: $main-yellow;
        top: 0;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        z-index: 1;
    }

    &__inner {
        overflow: hidden;
        max-width: 100%;
        position: relative;
        min-height: 40px;
        width: 100%;
    }

    &__list {
        display: flex;
        align-items: center;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
    }
}

</style>
