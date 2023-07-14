import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: {
            ygxm: '',
            ygid: '',
            yhkh: ''
        }
    },
    getters: {

    },
    mutations: {
        login(state, [ygxm, ygid, yhkh]) {
            state.user.ygxm = ygxm
            state.user.ygid = ygid
            state.user.yhkh = yhkh
        }
    },
    actions: {

    },
    modules: {

    }
})