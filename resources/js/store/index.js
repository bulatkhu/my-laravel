import Vuex from 'vuex'
import Vue from 'vue'

// import mainModule from './modules/main'
import chatModule from './modules/chat'
// import doubleModule from './modules/double'
// import inventory from './modules/inventory'


Vue.use(Vuex)



const store = new Vuex.Store({
    modules: {
        // main: mainModule,
        chat: chatModule,
        // double: doubleModule,
        // inventory: inventory,
    }
})


export default store
