<template>
    <div class="main">
        <div class="main__col">
            <Aside />
        </div>


        <div class="main__col">
            <div class="main-header">
                <Header/>
            </div>
            <div class="main-content">
                <div class="main-content__body">
                    <router-view />
                </div>

                <div class="main-content__aside">
                    <Chat/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Chat from './Chat';
import Header from './Header'
import Aside from './Aside';
import store from '../../../store';

export default {
    components: {
        Chat,
        Header,
        Aside
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

<style lang="scss" scoped>
@import "resources/assets/sass/_variables";

.main {
    background: $main-blue;
    display: flex;
    //flex-direction: column;
    min-height: 100vh;
    justify-content: space-between;

    &__col {
        &:first-child {
            display: flex;
            align-items: stretch;
            flex-basis: 430px;

            margin-right: 30px;
        }

        &:last-child {
            flex-basis: 100%;
            display: flex;
            align-items: stretch;
            width: 100%;
            flex-direction: column;
        }
    }
}

.main-content {
    display: grid;
    grid-template-columns: 1fr 376px;
    column-gap: 30px;
    height: 100%;

    &__aside {

    }
}

</style>
