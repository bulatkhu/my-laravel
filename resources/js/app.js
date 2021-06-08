require('./bootstrap');
import Vue from 'vue';
import App from './Vue/App.vue';
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(VueAxios, axios);

const app = new Vue({
    el: "#app",
    components: { App },
})
