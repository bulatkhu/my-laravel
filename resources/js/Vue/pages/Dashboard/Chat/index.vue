<template>
    <div class="chat-container">
        <div ref="chatBlock" class="chat-block">
            <div v-for="(msg, id) in messages" :key="msg.id">

                <div class="chat__image">
                    <img :src="msg.user.avatar" alt="avatar">
                </div>
                <span>{{id + 1}})</span> {{ msg.message }}
            </div>

        </div>

        <div class="chat-tools"><input name="message" v-model="chatMessage" type="text">
            <button @click="sendMessage()">Add message</button>
        </div>
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
        await this.getMessages();
        this.scrollControl();
    },
    methods: {
        async sendMessage() {
            if (!this.chatMessage) return;
            try {
                await this.axios.post(`/api/chat/send`, {
                    message: this.chatMessage
                })
                this.chatMessage = "";
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
        },
        scrollControl() {
            setTimeout(() => {
                const { chatBlock } = this.$refs;
                chatBlock.scrollTop = chatBlock.scrollHeight -
                    chatBlock.clientHeight
            }, 100)
        },
    },
    sockets: {
        newMessage(value) {
            this.messages = [...this.messages, value];
            this.scrollControl();
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

.chat-tools {}

.chat-block {
    max-height: 330px;
    overflow: auto;
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
