import {newDeck, shuffle} from "../lib/cards";
import {newPerks} from "../lib/classes";
import {END_ACTIONS, BASE_ATTACK_MODIFIER_CARDS, CURSE, BLESS} from "../lib/cards";
import {END_TURN} from "./turn";

function newAttackModifierDeck(cards, characterClass) {
    return {
        ...newDeck(cards),
        class: characterClass,
        needsShuffle: false,
        perks: newPerks(characterClass) || [],
        curseCount: 0,
        blessCount: 0,
    };
}

function resetDeck(perks) {
    let cards = BASE_ATTACK_MODIFIER_CARDS;
    perks.forEach((p) => {
        p.used.forEach((u) => {
            if (u) {
                cards = p.filterCards(cards);
            }
        });
    });
    return {...newDeck(cards), curseCount: 0, blessCount: 0};
}

function shuffleCards(cards, currentIndex) {
    // remove played discards
    const filteredCards = cards.filter((c, i) => !((c.endAction === END_ACTIONS.DISCARD) && (i <= currentIndex)));
    return shuffle(filteredCards);
}

function revealNextCard({currentIndex, playedCards, cards, needsShuffle, curseCount, blessCount}) {
    let nextCards = cards;
    let nextIndex = currentIndex + 1;
    if (nextIndex >= cards.length) {
        nextCards = shuffleCards(cards, currentIndex);
        nextIndex = 0;
    }

    const nextCard = nextCards[nextIndex];
    return {
        cards: nextCards,
        currentIndex: nextIndex,
        playedCards: [nextCard].concat(playedCards),
        needsShuffle: needsShuffle || (nextCard.endAction === END_ACTIONS.SHUFFLE),
        curseCount: nextCard === CURSE ? (curseCount - 1) : curseCount,
        blessCount: nextCard === BLESS ? (blessCount - 1) : blessCount,
    };
}

function addCard(deck, card) {
    // in case of -1 index
    const currentIndex = Math.max(0, deck.currentIndex);
    const randomIndex = (Math.random() * (deck.cards.length - currentIndex)) + currentIndex;
    return {
        cards: [
            ...deck.cards.slice(0, randomIndex),
            card,
            ...deck.cards.slice(randomIndex),
        ],
        curseCount: card === CURSE ? (deck.curseCount + 1) : deck.curseCount,
        blessCount: card === BLESS ? (deck.blessCount + 1) : deck.blessCount,
    };
}

function togglePerk(perks, perkIndex, perkCheckIndex) {
    return {
        perks: [
            ...perks.slice(0, perkIndex),
            {
                ...perks[perkIndex],
                used: [
                    ...perks[perkIndex].used.slice(0, perkCheckIndex),
                    !perks[perkIndex].used[perkCheckIndex],
                    ...perks[perkIndex].used.slice(perkCheckIndex + 1),
                ],
            },
            ...perks.slice(perkIndex + 1),
        ],
    }
}

function shuffleDeck({cards, currentIndex}) {
    return {
        cards: shuffleCards(cards, currentIndex),
        currentIndex: -1,
        playedCards: [],
        needsShuffle: false,
    };
}

const defaultState = {
    Monsters: newAttackModifierDeck(BASE_ATTACK_MODIFIER_CARDS, ""),
};

const RESET_PLAYERS = "attackModifierDeck/resetPlayers";
const ADD_DECK = "attackModifierDeck/add";
const RESET_DECK = "attackModifierDeck/reset";
const REVEAL_CARD = "attackModifierDeck/cards/next";
const ADD_CARD = "attackModifierDeck/cards/add";
const TOGGLE_PERK = "attackModifierDeck/perks/toggle";

export const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case RESET_PLAYERS: return defaultState;
        case ADD_DECK:
        {
            return {
                ...state,
                [action.deckName]: newAttackModifierDeck(BASE_ATTACK_MODIFIER_CARDS, action.class),
            };
        }
        case RESET_DECK:
        {
            const perks = state[action.deckName].perks;
            return {
                ...state,
                [action.deckName]: {
                    ...state[action.deckName],
                    ...resetDeck(perks),
                },
            };
        }
        case REVEAL_CARD:
        {
            const newDeck = revealNextCard(state[action.deckName]);
            return {
                ...state,
                [action.deckName]: {
                    ...state[action.deckName],
                    ...newDeck,
                },
            };
        }
        case ADD_CARD:
        {
            const deck = state[action.deckName];
            return {
                ...state,
                [action.deckName]: {
                    ...deck,
                    ...addCard(deck, action.card),
                },
            };
        }
        case TOGGLE_PERK:
        {
            const perks = state[action.deckName].perks;
            return {
                ...state,
                [action.deckName]: {
                    ...state[action.deckName],
                    ...togglePerk(perks, action.perkIndex, action.perkCheckIndex),
                },
            }
        }
        case END_TURN:
        {
            const newState = {};
            Object.keys(state).forEach((name) => {
                const deck = state[name];
                newState[name] = {
                    ...deck,
                    ...(deck.needsShuffle ? shuffleDeck(deck) : {playedCards: []}),
                };
            });
            return newState;
        }
        default: return state
    }
}

export function resetPlayersAction() {
    return {type: RESET_PLAYERS};
}

export function addDeckAction(name, characterClass) {
    return {type: ADD_DECK, deckName: name, class: characterClass};
}

export function resetDeckAction(name) {
    return {type: RESET_DECK, deckName: name};
}

export function revealNextCardAction(name) {
    return {type: REVEAL_CARD, deckName: name};
}

export function addCardAction(name, card) {
    return {type: ADD_CARD, deckName: name, card};
}

export function togglePerkAction(name, perkIndex, perkCheckIndex) {
    return {type: TOGGLE_PERK, deckName: name, perkIndex, perkCheckIndex};
}

function totalCards(state, getCardsFunc) {
    return Object.keys(state).reduce((total, name) => {
        if (name === "Monsters") {
            return total;
        }
        return total + getCardsFunc(state[name]);
    }, 0);
}

export const selectors = {
    totalCurses: (state) => totalCards(state, (deck) => deck.curseCount),
    totalBlessings: (state) => totalCards(state, (deck) => deck.blessCount),
};
