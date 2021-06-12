import VueSocketIO from 'vue-socket.io'
import SocketIO from 'socket.io-client'
import store from './store';
import VueSocketIOExt from 'vue-socket.io-extended';
import Vue from 'vue'

const { protocol, hostname } = window.location;
// const port = protocol === "https:" ? "8443" : "8081";
// const connectionUri = `${protocol}//${hostname}:${port}`;
const connectionUri = `${protocol}//${hostname}:${8081}`;
const socket = io(connectionUri);


Vue.use(VueSocketIOExt, socket);

// console.log("connectionUri", connectionUri);

// const VueSocket = Vue.use(new VueSocketIO({
//     debug: true,
//     connection: SocketIO(connectionUri),
//     vuex: {
//         store,
//         actionPrefix: 'SOCKET_',
//         mutationPrefix: 'SOCKET_'
//     }
// }))

