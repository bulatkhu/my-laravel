<template>
    <div class="item">
        <p :class="['item-name', isCompleted && 'item-completed']">{{ item.name }}</p>

        <div class="item-actions">
            <button @click="deleteItem()" style="margin-right: 10px">Delete</button>
            <button @click="statusChanged()" class="item-btn">{{ isCompleted ? '✓' : '✖' }}</button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        item: {
            name: String,
            completed: Boolean,
            id: Number,
        },
    },
    computed: {
        isCompleted() {
            return !!this.item.completed;
        }
    },
    methods: {
        async statusChanged() {
            try {
                const { data } = await this.axios.put(`api/item/${this.item.id}`, {
                    item: {
                        completed: !this.item.completed
                    }
                });
                this.$emit("itemStatusChanged");
                console.log("data", data);
            } catch (e) {
                console.log("error", e);
            }
        },
        async deleteItem() {
            try {
                await this.axios.delete(`api/item/${this.item.id}`);
                this.$emit("itemStatusChanged");
            } catch (e) {

            }
        }
    }
}
</script>

<style scoped>

.item {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.item-actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.item-completed {
    text-decoration: line-through;
}

</style>
