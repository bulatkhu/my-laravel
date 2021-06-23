<template>
    <div class="login-container">
        <div v-if="user" class="login-info">
            <div class="login-info__avatar">
                <img :src="user.avatar" alt="avatar">
            </div>
            <span class="login-info__name">{{user.username}}</span>
        </div>

        <a v-if="!user" href="/api/auth/steam" @click="onClickLogin()">Login through steam</a>
        <button @click="logout()" v-else>Logout</button>

    </div>
</template>

<script>
import store from '../../../store'

export default {
    methods: {
        onClickLogin() {
            console.log("login")
        },
        logout() {
            store.dispatch("logout");
        },
    },
    computed: {
        user: () => {
            return store.state.user;
        }
    },
}
</script>

<style scoped lang="scss">

.login-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    /*flex: 1;*/
    /*min-height: 100vh;*/
}

.login-info {
    display: flex;
    align-items: center;

    &__name {
        margin-left: 10px;
        white-space: nowrap;
    }

    &__avatar {
        width: 60px;
        min-width: 60px;
        height: 60px;
        min-height: 60px;

        img {
            width: 100%;
            height: 100%;
        }
    }

    margin-right: 30px;
}

.login-avatar {
    height: 40px;
    width: 40px;

    img {
        width: 100%;
        height: 100%;
    }
}

</style>
