import { createStore } from 'vuex';

export default createStore({
    state: {
        sessionState: false,
        feedback: false,
        page: null,
        deckCardsId: null,
    },
    
    mutations: {
        SIGN_IN(state, payload) {
            state.sessionState = payload;
        },
        FEEDBACK(state, payload) {
            state.feedback = payload;
        },
        PAGE(state, payload) {
            state.page = payload;
        },
        CARDS_DECK_ID(state, payload) {
            state.deckCardsId = payload;
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
        },
        page(context, payload){
            const setPage = payload;
            context.commit('PAGE', setPage);
        },
        deckCardsId(context, payload){
            const setCardsDeckId = payload;
            context.commit('CARDS_DECK_ID', setCardsDeckId);
        }
    },
    
    getters: {
        getSession(state){
            return state.sessionState;
        },
        getFeedback(state){
            return state.feedback;
        },
        getPage(state){
            return state.page;
        },
        getCardsDeckId(state){
            return state.deckCardsId;
        },
    }
})