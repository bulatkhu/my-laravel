<template>
    <li>
        <router-link class="double-col-user" to="/">
            <span class="double-col-user__col">
                <span class="double-col-user__avatar">
                    <img
                        src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/46/46de67555b8b66670f1ddd4a6b5c65568bfab29e_full.jpg" alt="user">
                </span>
                <span class="double-col-user__name">Lorem ipsum dolor sit.</span>
            </span>
            <span class="double-col-user__col amount">0.21$</span>
        </router-link>
    </li>
</template>

<script>
export default {

}

// https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/46/46de67555b8b66670f1ddd4a6b5c65568bfab29e_full.jpg

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
