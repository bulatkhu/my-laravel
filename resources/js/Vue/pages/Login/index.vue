<template>
    <div class="login-container">

        <a href="/api/auth/steam" @click="onClickLogin()">Login through steam</a>

    </div>
</template>

<script>
export default {
    methods: {
        onClickLogin() {
            console.log("login")
        }
    },
}
</script>

<style scoped>

.login-container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    min-height: 100vh;
}

</style>
