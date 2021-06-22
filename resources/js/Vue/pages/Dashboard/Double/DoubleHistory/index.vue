<template>
    <div class="history">

        <div class="history__col">
            <p class="history-description">Last 100 bets</p>
            <div class="history-counters">
                <span class="history-counters__col blue">{{statistic.blues}}</span>
                <span class="history-counters__col green">{{statistic.greens}}</span>
                <span class="history-counters__col gold">{{statistic.golds}}</span>
            </div>
        </div>
        <div class="history__col">
            <span v-if="rolling">Spinning</span>
            <span v-else-if="gameOver">Game over</span>
            <div  v-else-if="bettingTime && bettingTime > 0" class="history-starting">
                <span class="history-starting__label">Starts in: </span>
                <span class="history-starting__timer amount" >{{ (bettingTime / 1000).toFixed(2) }}</span>
                <div class="history-starting__progress">
                    <div :style="{width: (bettingTime / 100) + '%'}" />
                </div>
            </div>
            <span v-else>Waiting</span>
        </div>
        <div class="history__col">
            <div v-for="({ winnerColor }, index) in lastTenBets" :key="index" :class="['winnerBlock', winnerColor]" />
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            lastBets: [],
            timeLeft: 0,
            rolling: false,
            gameOver: false,
            bettingTime: 0,

            intervalId: null,
        }
    },
    mounted() {
        this.getRouletteHistory();
    },
    methods: {
        async getRouletteHistory() {
            try {
                const { data } = await this.axios.get("/api/bot/roulette/state");
                this.lastBets = data;
            } catch (e) {
                console.log("e.message", e.message)
            }
        },
        setBettingTime(time) {
            clearInterval(this.invervalId);
            this.bettingTime = time;
            this.invervalId = setInterval(() => {
                this.bettingTime = this.bettingTime - 10
            }, 10)
        },
    },
    computed: {
        lastTenBets() {
            return JSON.parse(JSON.stringify(this.lastBets)).splice(0, 10);
        },
        statistic() {
            let greens = 0;
            let golds = 0;
            let blues = 0;

            this.lastBets.forEach(bet => {
                if (bet.winnerColor === "blue") {
                    blues = blues + 1
                } else if (bet.winnerColor === "gold") {
                    golds = golds + 1
                } else if (bet.winnerColor === "green") {
                    greens = greens + 1
                }
            })

            return { greens, golds, blues }
        }
    },
    sockets: {
        startDouble(data) {
            this.$store.dispatch("double/setStatus", "bettingTime");
            this.setBettingTime(data.bettingTime)
        },
        endDouble({ data }) {
            const timeLeft = Date.parse(data.endAt) - Date.parse(data.rollingAt);
            this.$store.dispatch("double/setStatus", "spinning");

            this.rolling = true
            this.timeLeft = timeLeft;
            setTimeout(() => {
                const newLastBets = [...this.lastBets];
                newLastBets.pop();
                newLastBets.unshift(data);
                this.lastBets = newLastBets;
                this.rolling = false
                this.gameOver = true
                setTimeout(() => {
                    this.gameOver = false
                }, 1000)
            }, timeLeft)
        },
        lastDoubleBet(data) {
            const {rollingAt, startDate, endAt} = data;
            const dateNow = Date.now();

            if (Date.parse(startDate) < dateNow && Date.parse(endAt) > dateNow) {
                /* time to bet */
                this.$store.dispatch("double/setStatus", "bettingTime");
                this.setBettingTime(Date.parse(rollingAt) - dateNow)
            }
        }
    },
}
</script>

<style scoped lang="scss">
@import "resources/assets/sass/_variables";

.history {
    padding: 10px 0;
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    &__col {
        display: flex;
        flex-basis: 33.33%;

        &:nth-child(2) {
            justify-content: center;
        }

        &:last-child {
            display: flex;
            align-items: center;
            justify-content: flex-end;
        }
    }
}

.history-description {
    margin-right: 10px;
}

.history-starting {
    width: 100%;
    text-align: center;

    &__timer {
        display: inline-block;
        width: 20px;
        //margin-bottom: 20px;
    }

    &__progress {
        overflow: hidden;

        width: 33.33%;
        height: 2px;
        position: absolute;
        bottom: 0;

        left: 50%;
        transform: translateX(-50%);

        div {
            height: 100%;
            background-color: $main-yellow;
        }
    }
}

.history-counters {
    display: flex;
    align-items: center;
    justify-content: center;
    &__col {
        position: relative;
        padding-left: 20px;

        &:not(:last-child) {
            margin-right: 5px;
        }

        &::before {
            content: "";
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            left: 0;
            width: 10px;
            height: 10px;
            border-radius: 2px;
        }

        &.blue {
            &::before {
                background-color: $coin-main-blue;
            }
        }

        &.gold {
            &::before {
                background-color: $main-yellow;
            }
        }

        &.green {
            &::before {
                background-color: $main-green;
            }
        }
    }
}

.winnerBlock {
    width: 18px;
    height: 18px;
    border-radius: 5px;
    margin: 0 5px;

    &.blue {
        background-color: $coin-main-blue;
    }

    &.gold {
        background-color: $main-yellow;
    }

    &.green {
        background-color: $main-green;
    }
}

</style>
