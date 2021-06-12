<template>
    <div>
        <div class="header">
            <h2 class="header-title">Todo List</h2>
            <p>User's count: {{online}}</p>
            <AddItemForm v-on:updateList="fetchItems()" />
        </div>

        <div class="todo-list">
            <ListView v-on:updateList="fetchItems()" :items="items" />
        </div>
    </div>
</template>

<script>
import AddItemForm from '../AddItemForm'
import ListView from '../ListView'

export default {
    components: {ListView, AddItemForm },
    data() {
        return {
            items: [],
            online: 0,
        };
    },
    async mounted() {
        await this.fetchItems();
    },
    sockets: {
        online(value) {
            this.online = value;
        }
    },
    methods: {
        async fetchItems() {
            try {
                const { data } = await this.axios.get("api/items");
                this.items = data;
            } catch (e) {
                console.log("error", e);
            }
        }
    }
}
</script>

<style scoped>

.todo-list-container {
    max-width: 600px;
    margin: auto;
}

.header {

}

.header-title {
    text-align: center;
}

</style>
