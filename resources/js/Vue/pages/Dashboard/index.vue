<template>
    <div class="main">
        <div class="main__col">
            <Aside />
        </div>
        <div class="main__col">
            <div class="main-header">
                <Header/>
            </div>
            <div :class="['main-content', $store.state.chatHide && 'chat-hidden']">
                <button class="main-content__chatBtn" @click="$store.state.chatHide = !$store.state.chatHide">hide
                </button>

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
    transition: all .3s;
    position: relative;
    overflow: hidden;

    &__chatBtn {
        z-index: 1;
        right: 0;
        position: absolute;
        width: auto;
    }

    &.chat-hidden {
        grid-template-columns: 1fr 0;
    }

    &__aside {
        position: relative;
        overflow: hidden;
    }
}

</style>
