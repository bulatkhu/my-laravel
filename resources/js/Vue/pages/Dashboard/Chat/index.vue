<template>
    <div class="chat-container">
        <div ref="chatBlock" class="chat-block">
            <div class="chat-block__message" v-for="(msg) in messages" :key="msg.id">

                <div class="chat-block__img">
                    <img :src="msg.user.avatar" alt="avatar">
                </div>
                <span> {{ msg.message }} </span>
            </div>

        </div>

        <div class="chat-tools"><label>
            <input name="message" v-model="chatMessage" type="text">
        </label>
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

<style scoped lang="scss">
@import "@/_variables";

.chat-container {
    width: 500px;
    max-width: 100%;
    min-height: 100%;
    background: $secondary-blue;
    padding: 10px 20px;
    border-radius: 20px 10px 10px 0;

    display: flex;
    align-items: stretch;
    flex-direction: column;
}

.chat-tools {}

.chat-block {
    //max-height: 330px;
    overflow: auto;
    height: 90%;

    &__message {
        display: flex;
        align-items: center;

        &:not(:last-child) {
            margin-bottom: 10px;
        }
    }

    &__img {
        width: 40px;
        height: 40px;
        margin-right: 10px;

        img {
            max-width: 100%;
            max-height: 100%;
        }
    }
}

</style>
