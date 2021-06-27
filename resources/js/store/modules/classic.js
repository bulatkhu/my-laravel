// import { fakeApi } from "@/src/api";
// import store from "@/src/store";
// import router from "@/src/router/Schema";

const mutations = {};

const actions = {};

const classic = {
    namespaced: true,
    state: {
        start: false,
        maxItems: 100,
        items: 0,
        participants: [],
        timeLeft: 30,
    },
    mutations,
    actions,
};

export default classic;
