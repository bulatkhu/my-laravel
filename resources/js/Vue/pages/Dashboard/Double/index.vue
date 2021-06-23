<template>
    <div class="double">
        <div class="double-content">
            <DoubleSlider />
            <DoubleHistory />
        </div>

        <div class="double-content double-statistic">
            <DoubleStatistic :bets="bets" />
        </div>

        <DoubleParticipants :bets="bets" />
    </div>
</template>

<script>
import DoubleSlider from './DoubleSlider';
import DoubleHistory from './DoubleHistory';
import DoubleStatistic from './DoubleStatistic';
import DoubleParticipants from './DoubleParticipants';

export default {
    components: {
        DoubleSlider,
        DoubleHistory,
        DoubleStatistic,
        DoubleParticipants
    },
    data() {
        return {
            bets: [],
        }
    },
    sockets: {
        newBetError({ message }) {
            this.$notify({ type: "info", text: message })
        },
        newBetSuccess() {
            this.$notify({ type: "success", text: "You have bet" })
        },
        startDouble() {
            this.bets = [];
        },
        newRouletteBet(data) {
            this.bets = [...data];
        },
        currentParticipants(data) {
            this.bets = [...data];
        }
    },
    mounted() {
        this.$socket.client.emit("getLastDoubleBet");
    }
}
</script>

<style lang="scss" scoped>
@import "resources/assets/sass/_variables";

.double {}

.double-content {
    background-color: $secondary-blue;
    padding: 20px 20px 10px;
    position: relative;
    border-radius: 10px;

    margin-bottom: 20px;
}

.double-statistic {
    padding-bottom: 20px;
    margin-bottom: 35px;
}

</style>
