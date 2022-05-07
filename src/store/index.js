/**
 * Vuex is a state managmeent library used to pass states from a component to another regardless of their parent
 */
import { createStore } from 'vuex';

export default createStore({
    state: {
        // states hold the data to be read from or written from
        // data gets upadted only within the store file
        sessionState: false,
        feedback: false,
        cards: null,
        page: null,
        deckCardsId: null,
    },
    
    mutations: {
        // mutations are responsible to update the states wihtin the file, it receives data from the payload which itsself comes from the actions
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
        // actions gets the data from the components and sends it to the mutations
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
        // getters allow to read data from the components
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