<template>
    <div>
        authcallback
    </div>
</template>

<script>

export default {
    mounted() {
        const { token } = this.$route.query;
        if (token) {
            localStorage.setItem("Bearer", token);
            this.$router.push("/");
        } else {
            alert("not authenticated")
        }
    }
}
</script>

<style scoped>

</style>
