<template>
    <header class="header">
        <nav class="header-nav">
            <router-link exact-active-class="active" class="header-nav__link" to="/">Crash</router-link>
            <router-link exact-active-class="active" class="header-nav__link" to="/double">Double</router-link>
<!--            <router-link class="header-nav__link" to="/">Crash</router-link>-->
<!--            <router-link class="header-nav__link" to="/">Crash</router-link>-->
        </nav>

        <div class="header-data">
            <Login/>
        </div>
    </header>
</template>

<script>
import Login from '../../Login'

export default {
    components: {Login}
}
</script>

<style lang="scss" scoped>
@import "resources/assets/sass/_variables";

.header {
    padding: 20px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.header-nav {
    display: flex;
    align-items: center;
    text-align: center;
    margin-left: -10px;

    padding: 10px;

    &__link {
        margin: 0 10px;
        padding: 20px 10px;
        text-transform: uppercase;
        border-radius: 10px;

        &.active {
            background-color: $secondary-blue;
        }
    }
}

.header-data {

}

</style>
