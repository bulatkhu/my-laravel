require('./bootstrap');
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './Vue/App.vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Vuex from 'vuex';
import SocketIO from 'socket.io-client'
import VueSocketIOExt from 'vue-socket.io-extended';
import router from './router/Schema';

const { protocol, hostname } = window.location;
// const port = protocol === "https:" ? "8443" : "8081";
// const connectionUri = `${protocol}//${hostname}:${port}`;
const connectionUri = `${protocol}//${hostname}:${8081}`;
const socket = SocketIO(connectionUri);

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(VueAxios, axios);
Vue.use(VueSocketIOExt, socket);


new Vue({
    router,
    el: "#app",
    components: { App },
});
