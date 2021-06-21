<template>
    <li>
        <router-link class="double-col-user" :to="`/profile/${bet.user.id}`">
            <span class="double-col-user__col">
                <span class="double-col-user__avatar">
                    <img
                        :src="bet.user.avatar" alt="user">
                </span>
                <span class="double-col-user__name">{{ bet.user.username }}</span>
            </span>
            <span class="double-col-user__col amount">{{ bet.value }}$</span>
        </router-link>
    </li>
</template>

<script>
export default {
    props: {
        bet: {
            user: {
                id: Number,
                avatar: String,
                username: String
            },
            value: Number
        }
    }
}

</script>

<style lang="scss" scoped>
@import "resources/assets/sass/_variables";

.double-col-user {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: $secondary-blue;
    padding: 10px;
    border-radius: 10px;

    margin-bottom: 10px;

    font-size: 14px;

    span {
        display: inline-block;
    }

    &__avatar {
        width: 40px;
        height: 40px;
        margin-right: 5px;
        border-radius: 10px;
        overflow: hidden;

        img {
            height: 100%;
            width: 100%;
        }
    }

    &__col {
        &:first-child {
            display: flex;
            align-items: center;
        }
    }

}

</style>
