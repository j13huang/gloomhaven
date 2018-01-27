import {shuffle} from "../lib/cards";
import {newPerks} from "../lib/classes";
import {END_ACTIONS, BASE_ATTACK_MODIFIER_CARDS, CURSE, BLESS} from "../lib/cards";
import {ADD_PLAYER, REMOVE_PLAYER} from "./actions/players";
import {END_TURN} from "./actions/turn";

function newDeck(cards) {
    return {
        cards: shuffle(cards),
        currentIndex: -1,
        playedCards: [],
        curseCount: 0,
        blessCount: 0,
    };
}

function newAttackModifierDeck(cards, characterClass) {
    return {
        ...newDeck(cards),
        class: characterClass,
        needsShuffle: false,
        perks: newPerks(characterClass) || [],
    };
}

function resetCards(perks) {
    let cards = BASE_ATTACK_MODIFIER_CARDS;
    perks.forEach((p) => {
        p.used.forEach((u) => {
            if (u) {
                cards = p.filterCards(cards);
            }
        });
    });
    return newDeck(cards);
}

function shuffleCards(cards, currentIndex) {
    // remove played discards
    const filteredCards = cards.filter((c, i) => !((c.endAction === END_ACTIONS.DISCARD) && (i <= currentIndex)));
    return shuffle(filteredCards);
}

function revealNextCard({cards, currentIndex, playedCards, needsShuffle, curseCount, blessCount}) {
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

function undoCard({cards, currentIndex, playedCards, curseCount, blessCount}) {
    let currentCard = cards[currentIndex];
    const newPlayedCards = playedCards.slice(1);
    return {
        currentIndex: currentIndex - 1,
        playedCards: newPlayedCards,
        needsShuffle: newPlayedCards.some((c) => c.endAction === END_ACTIONS.SHUFFLE),
        curseCount: currentCard === CURSE ? (curseCount + 1) : curseCount,
        blessCount: currentCard  === BLESS ? (blessCount + 1) : blessCount,
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

const RESET_CARDS = "attackModifierDeck/cards/reset";
const REVEAL_CARD = "attackModifierDeck/cards/next";
const UNDO_CARD = "attackModifierDeck/cards/undo";
const ADD_CARD = "attackModifierDeck/cards/add";
const TOGGLE_PERK = "attackModifierDeck/perks/toggle";

export const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case ADD_PLAYER:
        {
            return {
                ...state,
                [action.name]: newAttackModifierDeck(BASE_ATTACK_MODIFIER_CARDS, action.class),
            };
        }
        case REMOVE_PLAYER:
        {
            const newState = {...state};
            delete newState[action.name];
            return {
                ...newState,
            };
        }
        case RESET_CARDS:
        {
            const perks = state[action.deckName].perks;
            return {
                ...state,
                [action.deckName]: {
                    ...state[action.deckName],
                    ...resetCards(perks),
                },
            };
        }
        case REVEAL_CARD:
        {
            return {
                ...state,
                [action.deckName]: {
                    ...state[action.deckName],
                    ...revealNextCard(state[action.deckName]),
                },
            };
        }
        case UNDO_CARD:
        {
            return {
                ...state,
                [action.deckName]: {
                    ...state[action.deckName],
                    ...undoCard(state[action.deckName]),
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
            return Object.keys(state).reduce((acc, name) => {
                const deck = state[name];
                acc[name] = {
                    ...deck,
                    ...(deck.needsShuffle ? shuffleDeck(deck) : {playedCards: []}),
                }
                return acc;
            }, {});
        }
        default: return state
    }
}

export function resetCardsAction(name) {
    return {type: RESET_CARDS, deckName: name};
}

export function revealNextCardAction(name) {
    return {type: REVEAL_CARD, deckName: name};
}

export function undoCardAction(name) {
    return {type: UNDO_CARD, deckName: name};
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
    totalCurses: (state) => totalCards(state.attackModifierDecks, (deck) => deck.curseCount),
    totalBlessings: (state) => totalCards(state.attackModifierDecks, (deck) => deck.blessCount),
};
