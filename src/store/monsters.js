import {shuffle} from "../lib/cards";
import {MONSTERS} from "../lib/monsters";
import {END_ACTIONS} from "../lib/cards";
import {END_TURN} from "./turn";

function newDeck(cards, withCard) {
    const newCards = shuffle(cards);
    return {
        cards: newCards,
        currentIndex: withCard ? 0 : -1,
        currentCard: withCard ? newCards[0] : null,
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

const defaultState = {
};

const RESET_MONSTERS = "monsters/reset";
const ADD_MONSTERS = "monsters/add";
const REMOVE_MONSTER = "monsters/remove";
const REVEAL_CARDS = "monsters/decks/next";

// monster trackers
/*
const ADD_MONSTER_TRACKER = "monsters/tracker/add";
const REMOVE_MONSTER_TRACKER = "monsters/tracker/remove";
const CHANGE_MONSTER_HEALTH = "monsters/tracker/hp/set";
const TOGGLE_MONSTER_STATUS = "monsters/tracker/status/toggle";
const TOGGLE_MONSTER_ELITE = "monsters/tracker/elite/toggle";
*/

export const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case RESET_MONSTERS:
        {
            return defaultState;
        }
        case ADD_MONSTERS:
        {
            const withCard = Object.keys(state).find((name) => state[name].currentCard !== null);
            return {
                ...state,
                ...action.monsters.reduce((acc, name) => {
                    acc[name] = newDeck(MONSTERS[name].cards, withCard);
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
        case REVEAL_CARDS:
        {
            return Object.keys(state).reduce((acc, name) => {
                acc[name] = revealNextCard(state[name]);
                return acc;
            }, {});
        }
        case END_TURN:
        {
            return Object.keys(state).reduce((acc, name) => {
                acc[name] = {...state[name], currentCard: null};
                return acc;
            }, {});
        }
        default: return state
    }
}

export function resetMonstersAction() {
    return {type: RESET_MONSTERS};
}

export function addMonstersAction(monsterNames) {
    return {type: ADD_MONSTERS, monsters: monsterNames};
}

export function removeMonsterAction(name) {
    return {type: REMOVE_MONSTER, name};
}

export function revealNextCardsAction() {
    return {type: REVEAL_CARDS};
}

export const selectors = {
    hasActiveCards: (state) => {
        const monsters = state.monsters;
        return Object.keys(monsters).some((m) => monsters[m].currentCard);
    },
};
