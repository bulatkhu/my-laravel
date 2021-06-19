<template>
    <button @click="onBet" :class="['btn-participate', type]">
        <span class="btn-participate__label">Bet</span>

        <span class="btn-participate__amount">{{amount || "0.00"}}</span>
    </button>
</template>

<script>
const message = "You must be authorized to participate!"

export default {
    props: ["amount", "type"],
    methods: {
        onBet() {
            const token = localStorage.getItem("Bearer");
            if (!this.$store.state.authorized || !token) {
                this.$notify({ text: message, type: "warn" });
                return;

            }

            this.$socket.client.emit("newDoubleBet", {
                type: this.type,
                amount: 10,
                token
            });

        }
    },
    computed: {
        isAuth() {
            return this.$store.state.authorized
        }
    }
}
</script>

<style scoped lang="scss">
@import "resources/assets/sass/_variables";

.btn-participate {
    padding: 15px 20px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: bold;

    &.blue {
        background-color: $coin-main-blue;
    }
    &.gold {
        background-color: $main-yellow;
    }
    &.green {
        background-color: $main-green;
    }

    &__label {

    }

    &__amount {

    }
}

</style>
