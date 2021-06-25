<template>
    <div class="chat">
        <div :class="['chat-container', $store.state.chatHide && 'hidden']">
            <div class="chat-container__wrapper">
                <div ref="chatBlock" class="chat-block">
                    <div class="chat-block__message" v-for="(msg) in messages" :key="msg.id">

                        <div class="chat-block__top">
                            <div class="chat-block__img">
                                <img :src="msg.user.avatar" alt="avatar">
                            </div>
                            <div class="chat-block__user">
                                <span> {{ msg.user.username }} </span>
                                <span> {{ msg.message }} </span>
                            </div>
                        </div>

                        <span class="chat-block__time">{{ msg.time }}</span>
                    </div>

                </div>

                <div class="chat-tools"><label>
                    <input name="message" v-model="chatMessage" type="text">
                </label>
                    <button @click="sendMessage()">Add message</button>
                </div>
            </div>
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
@import "resources/assets/sass/_variables";

.chat {
    height: 100%;
    position: relative;

    &__button {
        position: absolute;
        right: 0;
        z-index: 1;
    }
}

.chat-container {
    width: 500px;
    max-width: 100%;
    min-height: 100%;
    background: $secondary-blue;
    padding: 10px 20px;
    border-radius: 20px 10px 10px 0;

    display: flex;
    align-items: stretch;
    justify-content: stretch;
    flex-direction: column;

    position: relative;
    height: 100%;

    transition: all .6s;

    &.hidden {
        left: 100%;
    }

    &__wrapper {
        height: 100%;
    }
}

.chat-tools {
    position: absolute;
    bottom: 0;
}

.chat-block {
    //max-height: 330px;
    overflow: auto;
    height: 95%;
    position: absolute;
    width: 100%;
    max-width: 90%;
    max-height: 90%;

    &__time {
        font-size: 12px;
        text-align: center;
    }

    &__user {
        flex-direction: column;
        display: flex;
    }

    &__message {
        &:not(:last-child) {
            margin-bottom: 10px;
        }
    }

    &__top {
        display: flex;
        align-items: center;
    }

    &__img {
        width: 40px;
        height: 40px;
        margin-bottom: 5px;
        margin-right: 10px;

        img {
            max-width: 100%;
            max-height: 100%;
        }
    }
}

</style>
