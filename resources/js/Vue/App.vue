<template>
    <router-view />
</template>

<script>
export default {
}
</script>

<style lang="scss">

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    color: inherit;
    font-weight: unset;
    font-family: inherit;
    &::-webkit-scrollbar {
        width: 5px;
        height: 5px;
    }
    &::-webkit-scrollbar-button {
        width: 5px;
        height: 5px;
    }
    &::-webkit-scrollbar-thumb {
        border: 0px none #fff;
        background: #a7aec4;
        border-radius: 6px;
    }
    &::-webkit-scrollbar-track {
        border: 0 none #fff;
        padding: 2px;
        background: #ecf0f3;
        box-shadow: 1px 1px 1px rgb(255 255 255 / 70%),
        inset -2px 2px 5px rgb(209 217 230 / 50%),
        inset 1px 1px 1px rgb(209 217 230 / 90%);
        transition: all 0.3s ease;
        border-radius: 6px;
    }
}
ul {
    list-style: none;
}
a {
    text-decoration: none;
}
button {
    all: unset;
    display: block;
    cursor: pointer;
}
body {
    margin: 0;
    padding: 0;
    color: #fff;
    font-family: Rubik, sans-serif;
}


</style>
