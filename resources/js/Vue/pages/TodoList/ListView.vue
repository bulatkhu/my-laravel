<template>
    <div>
        Todos:
        <ListItem
            v-on:itemStatusChanged="$emit('updateList')"
            v-for="item of items"
            :key="item.id"
            :item="item"
        />
    </div>
</template>

<script>
import ListItem from './ListItem'
export default {
    components: {ListItem},
    props: ["items"],
}
</script>

<style scoped>

</style>
