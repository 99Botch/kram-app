import { createStore } from 'vuex';

export default createStore({
    state: {
        sessionState: false,
    },
    
    mutations: {
        SIGN_IN(state, payload) {
            state.sessionState = payload
        }
    },
    
    actions: {
        signIn(context, payload){
            const sessionUpd = payload;
            context.commit('SIGN_IN', sessionUpd);
        }
    },
    
    getters: {
        getSession(state){
            return state.sessionState;
        }
    }
})