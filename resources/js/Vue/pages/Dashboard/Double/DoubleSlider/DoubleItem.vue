<template>
    <li :class="['double-item', this.color].join(' ')">
        {{index}}
<!--        <img :src="betIcon" alt="">-->
    </li>
</template>

<script>
// import blueBet from "@img/svg-icons/bet-icons/betBlue.svg";
// import greenBet from "@img/svg-icons/bet-icons/betBlue.svg";
// import goldBet from "@img/svg-icons/bet-icons/betBlue.svg";

// console.log("blue bet", blueBet);
export default {
    props: {
        color: String,
        index: Number,
    },
    data() {
        let betIcon = this.asset("/images/betBlue.svg")
        // switch (this.color) {
        //     case "blue": {
        //         betIcon = "/public/images/svg-icons/bet-icons/betBlue.svg"
        //         break;
        //     }
        //     case "green": {
        //         betIcon = "/public/images/svg-icons/bet-icons/betBlue.svg"
        //         break;
        //     }
        //     case "gold": {
        //         betIcon = "/public/images/svg-icons/bet-icons/betBlue.svg"
        //         break;
        //     }
        // }

        return {
            betIcon
        }
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

    //display: flex;
    //align-items: center;
    //justify-content: center;

    img {
        width: 100%;
        height: 100%;
    }

    &.blue {
        background-color: $coin-main-blue;
    }

    &.green {
        background-color: $main-green;
    }

    &.gold {
        background-color: $main-yellow;
    }
}

</style>
