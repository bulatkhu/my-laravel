<template>
    <div class="double-part">
        <div class="double-part__col">
            <ColumnHeader amount="23" players="71" type="blue" />
            <ParticipateButton type="blue" />
            <ul class="double-part__list">
                <ParticipantItem :key="index" v-for="(bet, index) in groupedBets.blue" :bet="bet" />
            </ul>
        </div>
        <div class="double-part__col">
            <ColumnHeader amount="251" players="31" type="gold" />
            <ParticipateButton type="gold" />
            <ul class="double-part__list">
                <ParticipantItem :key="index"  v-for="(bet, index) in groupedBets.gold" :bet="bet" />
            </ul>
        </div>
        <div class="double-part__col">
            <ColumnHeader amount="231" players="10" type="green" />
            <ParticipateButton type="green" />
            <ul class="double-part__list">
                <ParticipantItem :key="index"  v-for="(bet, index) in groupedBets.green" :bet="bet" />
            </ul>
        </div>
    </div>
</template>

<script>
import ColumnHeader from './ColumnHeader'
import ParticipateButton from './ParticipateButton'
import ParticipantItem from './PariticipantItem'
export default {
    components: {ParticipantItem, ParticipateButton, ColumnHeader},
    data() {
        return {
            bets: [],
        }
    },
    computed: {
        groupedBets() {
            return {
                green: this.bets.filter(bet => bet.color === "green"),
                blue: this.bets.filter(bet => bet.color === "blue"),
                gold: this.bets.filter(bet => bet.color === "gold"),
            }
        },
    },
    sockets: {
        startDouble() {
            this.bets = [];
        },
        newRouletteBet(data) {
            this.bets = [...this.bets, data];
        },
    }
}
</script>

<style scoped lang="scss">

.double-part {
    display: flex;
    justify-content: space-between;

    &__list {
        margin-top: 30px;
    }

    &__col {
        flex-basis: calc(33.33% - 10px);
    }
}

</style>
