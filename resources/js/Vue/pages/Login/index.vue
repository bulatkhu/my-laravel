<template>
    <div class="login-container">
        <div v-if="user" class="login-info">
            <div class="login-info__avatar">
                <img :src="user.avatar" alt="avatar">
            </div>
            <span class="login-info__name">{{user.username}}</span>
            <span class="login-info__balance">{{user.balance}}$</span>
        </div>

        <a v-if="!user" href="/api/auth/steam" @click="onClickLogin()">Login through steam</a>
        <button @click="logout()" v-else>Logout</button>

        <p class="login-online">
            <span class="login-online__count">{{online}}</span>
            <span class="login-online__label">online</span>
        </p>

    </div>
</template>

<script>
import store from '../../../store'

export default {
    data() {
        return {
            online: 0
        }
    },
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
    sockets: {
        online(data) {
            this.online = data;
        }
    }
}
</script>

<style scoped lang="scss">
@import "resources/assets/sass/_variables";

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
        margin: 0 10px;
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

.login-online {
    text-align: center;
    margin: 0 10px;
    span {
        display: block;
    }

    &__count {
        color: $main-green;
    }

    &__label {

    }
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
