import {shuffle} from "../lib/cards";
import {MONSTERS, BOSS_CARDS} from "../lib/monsters";
import {END_ACTIONS, needsShuffle} from "../lib/cards";
import {RESET_MONSTERS, ADD_MONSTERS, REMOVE_MONSTER} from "./actions/monsters";
import {LOAD_PARTY} from "./actions/party";
import {SET_BOSS, REMOVE_BOSS} from "./actions/boss";
import {END_TURN} from "./actions/turn";

function newDeck(cards, initialActive) {
    return {
        ...shuffleDeck({cards}),
        active: initialActive,
    };
}

function shuffleDeck({cards}) {
    return {
        cards: shuffle(cards),
        currentIndex: -1,
        currentCard: null,
    };
}

function revealNextCard({cards, currentIndex, currentCard}) {
    let nextCards = cards;
    let nextIndex = currentIndex + 1;
    if ((currentCard && currentCard.endAction === END_ACTIONS.SHUFFLE) ||
        (nextIndex >= cards.length)) {
        nextCards = shuffle(cards);
        nextIndex = 0;
    }

    const nextCard = nextCards[nextIndex];
    return {
        cards: nextCards,
        currentIndex: nextIndex,
        currentCard: nextCard,
    };
}

function hasActiveCards(decks) {
    return Object.keys(decks).some((m) => decks[m].currentCard);
}

const defaultState = {
};

const REVEAL_CARDS = "monsters/decks/next";
const TOGGLE_ACTIVE = "monsters/decks/toggleActive";

export const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case LOAD_PARTY:
        {
            return defaultState;
        }
        case RESET_MONSTERS:
        {
            return defaultState;
        }
        case ADD_MONSTERS:
        {
            return {
                ...state,
                ...action.monsters.reduce((acc, name) => {
                    const deck = newDeck(MONSTERS[name].cards, false);
                    acc[name] = {...deck};
                    return acc;
                }, {}),
            };
        }
        case REMOVE_MONSTER:
        {
            const newState = {...state};
            delete newState[action.name];
            return newState;
        }
        case SET_BOSS:
        {
            if (state["Boss"]) {
                return state;
            }
            const deck = newDeck(BOSS_CARDS, true);
            return {
                ...state,
                "Boss": {
                    ...deck,
                    ...(hasActiveCards(state) && revealNextCard(deck)),
                },
            };
        }
        case REMOVE_BOSS:
        {
            const newState = {...state};
            delete newState["Boss"];
            return newState;
        }
        case REVEAL_CARDS:
        {
            return Object.keys(state).reduce((acc, name) => {
                const deck = state[name];
                acc[name] = {...deck, ...(deck.active && revealNextCard(state[name]))};
                return acc;
            }, {});
        }
        case TOGGLE_ACTIVE:
        {
            const deck = state[action.name];
            let newDeck = {...deck, active: !deck.active, ...(deck.active ? {currentCard: null} : (hasActiveCards(state) && revealNextCard(deck)))};
            if (newDeck.active && hasActiveCards(state)) {
                newDeck = {...newDeck, ...revealNextCard(deck)};
            } else if (!newDeck.active) {
                newDeck.currentCard = null;
            }
            return {
                ...state,
                [action.name]: newDeck,
            };
        }
        case END_TURN:
        {
            return Object.keys(state).reduce((acc, name) => {
                const deck = state[name];
                acc[name] = {
                    ...deck,
                    ...(needsShuffle(deck) ? shuffleDeck(deck) : {currentCard: null}),
                };
                return acc;
            }, {});
        }
        default: return state
    }
}

export function revealNextCardsAction(dispatch) {
    dispatch({type: REVEAL_CARDS});
}

export function toggleActiveAction(dispatch, name) {
    dispatch({type: TOGGLE_ACTIVE, name});
}

export const selectors = {
    hasActiveCards: (state) => {
        return hasActiveCards(state.monsterDecks);
    },
    activeDecks: (state) => {
        const decks = state.monsterCards;
        return Object.keys(decks).reduce((acc, m) => {
            const deck = decks[m];
            if (deck.active) {
                acc[m] = deck;
            }
            return acc;
        }, {});
    },
};
