<template>
    <div class="double-part">
        <div class="double-part__col">
            <ColumnHeader :amount="groupedBetSums.blue" :players="groupedBets.blue.length" type="blue" />
            <ParticipateButton type="blue" />
            <ul class="double-part__list">
                <ParticipantItem :key="index" v-for="(bet, index) in groupedBets.blue" :bet="bet" />
            </ul>
        </div>
        <div class="double-part__col">
            <ColumnHeader :amount="groupedBetSums.gold" :players="groupedBets.gold.length" type="gold" />
            <ParticipateButton type="gold" />
            <ul class="double-part__list">
                <ParticipantItem :key="index"  v-for="(bet, index) in groupedBets.gold" :bet="bet" />
            </ul>
        </div>
        <div class="double-part__col">
            <ColumnHeader :amount="groupedBetSums.green" :players="groupedBets.green.length" type="green" />
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
        groupedBetSums() {
            return {
                green: this.groupedBets.green.reduce((sum, bet) => sum + bet.value, 0),
                blue: this.groupedBets.blue.reduce((sum, bet) => sum + bet.value, 0),
                gold: this.groupedBets.gold.reduce((sum, bet) => sum + bet.value, 0),
            }
        },
    },
    mounted() {
        this.$socket.client.emit("getRouletteParticipants");
    },
    sockets: {
        startDouble() {
            this.bets = [];
        },
        newRouletteBet(data) {
            this.bets = [...data];
        },
        currentParticipants(data) {
            this.bets = [...data];
        }
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
