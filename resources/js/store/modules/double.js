export const SET_DOUBLE_STATUS = 'SET_DOUBLE_STATUS'

const mutations = {
    [SET_DOUBLE_STATUS](state, data) {
        state.status = data
    }
}

export default {
    namespaced: true,
    state: {
        status: "Waiting"
    },
    actions: {
        setStatus(context, payload) {
            context.state.status = payload;
        }
    },
    mutations
}
