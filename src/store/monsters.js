import {shuffle} from "../lib/cards";
import {MONSTERS} from "../lib/monsters";
import {END_ACTIONS} from "../lib/cards";
import {END_TURN} from "./turn";

function newDeck(cards, initialActive) {
    return {
        cards: shuffle(cards),
        currentIndex: -1,
        currentCard: null,
        active: initialActive,
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

function hasActiveCards(monsters) {
    return Object.keys(monsters).some((m) => monsters[m].currentCard);
}

const defaultState = {
};

const RESET_MONSTERS = "monsters/reset";
const ADD_MONSTERS = "monsters/add";
const REMOVE_MONSTER = "monsters/remove";
const REVEAL_CARDS = "monsters/decks/next";
const SET_ACTIVE = "monsters/decks/setActive";

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
            return {
                ...state,
                ...action.monsters.reduce((acc, name) => {
                    const initialActive = name === "Boss";
                    const deck = newDeck(MONSTERS[name].cards, initialActive);
                    acc[name] = {
                        ...deck,
                        ...(initialActive && hasActiveCards(state) && revealNextCard(deck)),
                    };
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
                const monster = state[name];
                acc[name] = {...monster, ...(monster.active && revealNextCard(state[name]))};
                return acc;
            }, {});
        }
        case SET_ACTIVE:
        {
            const monster = state[action.name];
            let newMonster = {...monster, active: action.active, ...(!action.active ? {currentCard: null} : (hasActiveCards(state) && revealNextCard(monster)))};
            if (newMonster.active && hasActiveCards(state)) {
                newMonster = {...newMonster, ...revealNextCard(monster)};
            } else if (!newMonster.active) {
                newMonster.currentCard = null;
            }
            return {
                ...state,
                [action.name]: newMonster,
            };
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

export function setActiveAction(name, active) {
    return {type: SET_ACTIVE, name, active};
}

export const selectors = {
    hasActiveCards: (state) => {
        return hasActiveCards(state.monsters);
    },
    activeMonsters: (state) => {
        const monsters = state.monsters;
        return Object.keys(monsters).reduce((acc, m) => {
            const monster = monsters[m];
            if (monster.active) {
                acc[m] = monster;
            }
            return acc;
        }, {});
    },
};
