<template>
    <div class="double">
        <div class="double-content">
            <DoubleSlider />
            <DoubleHistory />
        </div>

        <div class="double-content double-statistic">
            <DoubleStatistic />
        </div>

        <DoubleParticipants />
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
    sockets: {
        newBetError(error) {
            console.log("error", error);
        },
        newBetSuccess(data) {
            console.log("bet data", data);
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
