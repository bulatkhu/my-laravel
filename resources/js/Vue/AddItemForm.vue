<template>
    <div class="add-item">
        <label for="name">
            Name
        </label>
        <input v-model="name" id="name" type="text" name="name">

        <button @click="onAddTodo()">Add todo</button>
    </div>
</template>

<script>
export default {
    name: 'AddItemForm.vue',
    data() {
        return {
            name: "",
        }
    },
    methods: {
        async onAddTodo() {
            try {
                const { data } = await this.axios.post("api/item/store", {
                    item: {
                        name: this.name
                    }
                })
                this.$emit("updateList");
                this.name = "";
                console.log("res", data)
            } catch (e) {
                console.log("err", e)
            }
        },
    }
}
</script>

<style scoped>
.add-item {
    margin-bottom: 20px;
}
</style>
