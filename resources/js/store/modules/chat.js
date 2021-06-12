export const SET_INITIAL_MESSAGES = 'SET_INITIAL_MESSAGES'

const mutations = {
    [SET_INITIAL_MESSAGES](state, data) {
        state.messages = [...data]
    }
}

export default {
    namespaced: true,
    state: {
        messages: [],
        connections: 0,
    },
    actions: {
        SOCKET_message(ctx, connections) {
            ctx.state.connections = connections
        },
        SOCKET_receiveMessage(ctx, data) {
            ctx.state.messages = [...ctx.state.messages, data]
            console.log('data', data)
        },
    },
    mutations
}
