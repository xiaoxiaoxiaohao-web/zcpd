import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        userInfo: {
            name: '',
            department: ''
        }
    },
    getters: {

    },
    mutations: {
        login(state, [name, department]) {
            state.userInfo.name = name
            state.userInfo.department = department
            console.log(name);
            console.log(department);
        }
    },
    actions: {

    },
    modules: {

    }
})