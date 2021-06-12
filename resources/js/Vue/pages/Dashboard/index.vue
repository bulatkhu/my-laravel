<template>
    <div>
        <h2>Dashboard</h2>

        <Chat></Chat>
    </div>
</template>

<script>
import Chat from './Chat';

export default {
    components: {
        Chat
    },
    mounted() {
        this.fetchUser();
    },
    methods: {
        async fetchUser() {
            const token = localStorage.getItem("Bearer");
            if (!token) return;
            try {
                const { data } = this.axios.get('/api/user/get', {
                     headers: {
                         Authorization: 'Bearer ' + localStorage.getItem("Bearer")
                     }
                });
                console.log("data", data);
            } catch (e) {
                console.log("error", e);
            }
        }
    }
}
</script>

<style scoped>

</style>
