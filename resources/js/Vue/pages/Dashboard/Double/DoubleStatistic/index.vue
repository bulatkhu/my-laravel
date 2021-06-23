<template>
    <div class="statistic">
        <div class="statistic-col">
            <p class="statistic-col__item">Round statics</p>
        </div>
        <div class="statistic-col">
            <p class="statistic-col__item">participate in <span class="amount">{{ betsSum }}$</span></p>
        </div>
        <div class="statistic-col">
            <p class="statistic-col__item">Participants <span>{{ uniqueParticipants }}</span></p>
            <p class="statistic-col__item">Skins <span>{{ bets.length }}</span></p>
        </div>

    </div>
</template>

<script>
export default {
    props: ["bets"],
    computed: {
        uniqueParticipants() {
            const uniqueBets = [];
            this.bets.forEach((bet) => {
                if (uniqueBets.find(uBet => uBet.user.id === bet.user.id)) return;
                uniqueBets.push(bet);
            })
            return uniqueBets.length;
        },
        betsSum() {
            return this.bets.reduce((sum, bet) => sum + bet.value, 0)
        }
    }
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
