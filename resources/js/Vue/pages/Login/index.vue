<template>
    <div class="login-container">
        <div v-if="user">
            <div class="login-avatar">
                <img :src="user.avatar" alt="avatar">
            </div>
            <span>name {{user.username}}</span>
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
    watch: {
        user: (newUser, oldUser) => {
            console.log("oldUser", oldUser)
            console.log("newUser", newUser)

        }
    }
}
</script>

<style scoped>

.login-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    /*flex: 1;*/
    /*min-height: 100vh;*/
}

</style>
