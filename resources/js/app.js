require('./bootstrap');
import Vue from 'vue';
import VueNotifications from 'vue-notification'
import VueRouter from 'vue-router';
import App from './Vue/App.vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Vuex from 'vuex';
import SocketIO from 'socket.io-client'
import VueSocketIOExt from 'vue-socket.io-extended';
import store from './store';
import router from './router/Schema';

console.log("process", process.env.APP_ENV);
const { protocol, hostname } = window.location;
// const port = protocol === "https:" ? "8443" : "8081";
// const connectionUri = `${protocol}//${hostname}:${port}`;
const connectionUri = protocol === "http:"
    ? `${protocol}//${hostname}:${8081}`
    : `https://evening-fjord-97654.herokuapp.com`;
const socket = SocketIO(connectionUri);

axios.interceptors.request.use(config => {
    config.headers.Authorization = "Bearer " + localStorage.getItem("Bearer");
    return config;
});

window.Vue = Vue;
Vue.mixin({
    methods: {
        asset(path) {
            const base_path = window._asset || '';
            return base_path + path;
        }
    }
});
Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(VueAxios, axios);
Vue.use(VueSocketIOExt, socket);
Vue.use(VueNotifications);

new Vue({
    router,
    store,
    el: "#app",
    components: { App },
});
