import Vuex from 'vuex'
import Vue from 'vue'

import axios from 'axios'
// import mainModule from './modules/main'
// import user from './modules/user'
// import inventory from './modules/inventory'
import chatModule from './modules/chat'
import doubleModule from './modules/double'

Vue.use(Vuex)

export const SET_USER_DATA = "SET_USER_DATA";
export const USER_LOGOUT = "USER_LOGOUT";

const mutations = {
    [SET_USER_DATA]: (state, payload) => {
        state.user = payload;
        state.authorized = true;
        return state;
    },
    [USER_LOGOUT]: (state) => {
        state.user = null;
        state.authorized = false;
        localStorage.removeItem("Bearer");
    }
};


const store = new Vuex.Store({
    state: {
        authorized: false,
        user: null,
    },

    actions: {
        async fetchUser({ commit }) {
            const token = localStorage.getItem("Bearer");
            if (!token) return;
            try {
                const { data } = await axios.get('/api/user/get');
                commit(SET_USER_DATA, data);
            } catch (e) {
                localStorage.removeItem("Bearer");
                console.log("error", e);
            }
        },
        logout({ commit }) {
            commit(USER_LOGOUT)
        }
    },
    mutations,
    modules: {
        // main: mainModule,
        // user,
        chat: chatModule,
        double: doubleModule,
        // inventory: inventory,
    }
})


export default store
