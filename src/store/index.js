import { createStore } from 'vuex';

export default createStore({
    state: {
        sessionState: false,
        feedback: false
    },
    
    mutations: {
        SIGN_IN(state, payload) {
            state.sessionState = payload;
        },
        FEEDBACK(state, payload) {
            state.feedback = payload;
        }
    },
    
    actions: {
        signIn(context, payload){
            const sessionUpd = payload;
            context.commit('SIGN_IN', sessionUpd);
        },
        feedback(context, payload){
            const saved = payload;
            context.commit('FEEDBACK', saved);
        }
    },
    
    getters: {
        getSession(state){
            return state.sessionState;
        },
        getFeedback(state){
            return state.feedback;
        },
    }
})