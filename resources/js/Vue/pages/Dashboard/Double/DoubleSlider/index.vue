<template>
    <div class="double-slide">
        <div class="double-slide__inner">
            <ul
                :style="{
                    transitionDuration: transitionDuration + 'ms',
                    transform: `translate3d(-${winner - 25}px, 0px, 0px)`
                }"
                class="double-slide__list">
                <DoubleItem
                    v-for="({ color, index }, key) in colors"
                    :color="color"
                    :key="key"
                    :index="index"
                />
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

const colors = [
    { color: 'blue', index: 1 },
    { color: 'green', index: 2 },
    { color: 'blue', index: 3 },
    { color: 'green', index:4  },
    { color: 'blue', index: 5 },
    { color: 'green', index: 6 },
    { color: 'blue', index: 7 },
    { color: 'green', index: 8 },
    { color: 'blue', index: 9 },
    { color: 'green', index: 10 },
    { color: 'blue', index: 11 },
    { color: 'green', index: 12 },
    { color: 'blue', index: 13 },
    { color: 'green', index: 14 },
    { color: 'gold', index: 15 }
]

const multipleColors = []

const cloneCounter = 10
for (let i = 0; i < cloneCounter; i++) {
    multipleColors.push(...colors);
}

const betWidth = 50

const singleColorOffset = colors.length * betWidth;
const allColorsOffset = multipleColors.length * betWidth;

export default {
    components: {DoubleItem},
    data() {
        return {
            winner: 0,
            transitionDuration: 5000,
            colors: multipleColors,
            lastOffset: 0,
        }
    },
    sockets: {
        startDouble() {
            this.transitionDuration = 0
            this.winner = this.lastOffset
            // console.log("startDouble data", data);
        },
        endDouble({ winner, rollingAt, endAt, }){
            const offset = winner.index * betWidth
            this.transitionDuration = Date.parse(endAt)  - Date.parse(rollingAt)
            this.winner = offset + allColorsOffset - (singleColorOffset * 2);
            this.lastOffset = singleColorOffset + offset
        }
    },
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
    margin-bottom: 20px;

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
        //transform: translateX(-50%);
        transition-timing-function: cubic-bezier(0.12, 0.8, 0.38, 1);
    }
}

</style>
