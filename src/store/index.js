import { createStore } from 'vuex';

export default createStore({
    state: {
        login: false,
    },
    
    mutations: {
        SIGN_IN(state, payload) {
            state.login = payload
        }
    },
    
    actions: {
        signIn(context, payload){
            const login = payload;
            context.commit('SIGN_IN', login);
        }
    },
    
    getters: {
    
    }
})