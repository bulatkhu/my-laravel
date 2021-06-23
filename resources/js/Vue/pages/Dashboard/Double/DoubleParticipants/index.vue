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
    props: ["bets"],
    computed: {
        groupedBets() {
            return {
                green: this.filterByColor("green"),
                blue: this.filterByColor("blue"),
                gold: this.filterByColor("gold"),
            }
        },
        groupedBetSums() {
            return {
                green: this.getSumByGroup(this.groupedBets.green),
                blue: this.getSumByGroup(this.groupedBets.blue),
                gold: this.getSumByGroup(this.groupedBets.gold),
            }
        },
    },
    methods: {
        getSumByGroup(group) {
            return group.reduce((sum, bet) => sum + bet.value, 0)
        },
        filterByColor(color) {
            return this.bets.filter(bet => bet.color === color)
        },
    },
    mounted() {
        this.$socket.client.emit("getRouletteParticipants");
    },
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
