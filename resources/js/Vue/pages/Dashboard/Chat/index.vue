<template>
    <div class="chat-container">
        <div class="chat-block">
            <div v-for="(msg, id) in messages" :key="msg.id">

                <div class="chat__image">
                    <img :src="msg.user.avatar" alt="avatar">
                </div>
                <span>{{id + 1}})</span> {{ msg.message }}
            </div>

        </div>

        <input v-model="chatMessage" type="text">
        <button @click="sendMessage()">Add message</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            messages: [],
            chatMessage: "",
        };
    },
    async mounted() {
        this.getMessages();
    },
    methods: {
        async sendMessage() {
            const token = localStorage.getItem("Bearer");

            if (!chatMessage) return;

            try {
                await this.axios.post(`/api/chat/send`, {
                    message: this.chatMessage
                }, {
                    headers: {
                        Authorization: 'Bearer ' + token
                    }
                })
            } catch (e) {
                console.log("error", e);
            }
            // this.$socket.client.emit("newMessage", "my new message!!!!!!");
        },
        async getMessages() {
            try {
                const { data } = await this.axios.get('/api/chat/get');
                this.messages = data;
            } catch (e) {
                console.log("error", e);
            }
        }
    }
}
</script>

<style scoped>
.chat-container {
    width: 500px;
    max-width: 100%;
    background: #ccc;
}

.chat-block {
    max-height: 100vh;
    /*height: 100px;*/
}

.chat__image {
    width: 40px;
    height: 40px;
}

.chat__image > img {
    max-width: 100%;
    max-height: 100%;
}

</style>
