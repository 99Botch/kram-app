import { createStore } from 'vuex';

export default createStore({
    state: {
        sessionState: false,
        feedback: false,
        cards: null,
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
        CARDS_IN_DECK(state, payload) {
            state.cards_in_deck = payload;
        },
        PAGE(state, payload) {
            state.page = payload;
        },
        CARDS(state, payload) {
            state.cards = payload;
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
        cards(context, payload){
            const setCards = payload;
            context.commit('CARDS', setCards);
        },
        page(context, payload){
            const setPage = payload;
            context.commit('PAGE', setPage);
        },
        deckCardsId(context, payload){
            const setCardsDeckId = payload;
            context.commit('CARDS_DECK_ID', setCardsDeckId);
        },
        
    },
    
    getters: {
        getSession(state){
            return state.sessionState;
        },
        getFeedback(state){
            return state.feedback;
        },
        getCardsInDeck(state){
            return state.cards_in_deck;
        },
        getPage(state){
            return state.page;
        },
        getCards(state){
            return state.cards;
        }
    }
})