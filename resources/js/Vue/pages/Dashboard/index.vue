<template>
    <div>
        <Login></Login>

        <h2>Dashboard</h2>

        <Chat></Chat>
    </div>
</template>

<script>
import Chat from './Chat';
import Login from '../Login'
import store from '../../../store'

export default {
    components: {
        Chat,
        Login
    },
    mounted() {
        store.dispatch("fetchUser");
    },
    methods: {
        // ...mapMutations("user/" + SET_USER_DATA, {
        //     fetchUser: [SET_USER_DATA],
        // })
        // async fetchUser() {
        //     const token = localStorage.getItem("Bearer");
        //     if (!token) return;
        //     try {
        //         const { data } = await this.axios.get('/api/user/get', {
        //              headers: {
        //                  Authorization: 'Bearer ' + token
        //              }
        //         });
        //         console.log("user", data);
        //     } catch (e) {
        //         console.log("error", e);
        //     }
        // }
    }
}
</script>

<style scoped>

</style>
