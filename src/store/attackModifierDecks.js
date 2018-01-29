import {shuffle} from "../lib/cards";
import {newPerks} from "../lib/classes";
import {END_ACTIONS, BASE_DECK, CURSE, BLESS, needsShuffle} from "../lib/cards";
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
        perks: newPerks(characterClass) || [],
    };
}

function applyPerks(perks) {
    let cards = BASE_DECK;
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

function revealNextCard({cards, currentIndex, playedCards, curseCount, blessCount}) {
    let nextCards = cards;
    let nextIndex = currentIndex + 1;
    let nextPlayedCards = playedCards;
    if (nextIndex >= cards.length) {
        nextCards = shuffleCards(cards, currentIndex);
        nextIndex = 0;
        nextPlayedCards = [];
    }

    const nextCard = nextCards[nextIndex];
    return {
        cards: nextCards,
        currentIndex: nextIndex,
        playedCards: [nextCard].concat(nextPlayedCards),
        curseCount: nextCard === CURSE ? (curseCount - 1) : curseCount,
        blessCount: nextCard === BLESS ? (blessCount - 1) : blessCount,
    };
}

function handleUndoDiscard(cards, currentIndex, totalCount, cardToMatch) {
    let newCards = cards;
    let countIncrease = 0;

    const matchedCards = newCards
        .map((c, i) => [c, i, Math.random()])
        .filter(([c, ..._], i) => i > currentIndex && c === cardToMatch)
    if (totalCount === 10 && matchedCards.length > 0) {
        // find largest random value aka pick one random number
        const randomValue = {
            value: matchedCards[0][2],
            index: matchedCards[0][1],
        };
        matchedCards.forEach(([c, i, rand]) => {
            if (rand > randomValue.value) {
                randomValue.value = rand;
                randomValue.index = i;
            }
        })
        newCards = [
            ...newCards.slice(0, randomValue.index),
            ...newCards.slice(randomValue.index + 1),
        ];
    } else {
        countIncrease = 1;
    }

    return [ newCards, countIncrease ];
}

function undoCard(state, deckName) {
    const deck = state[deckName]
    const {cards, currentIndex, playedCards, curseCount, blessCount} = deck;

    let newCards = cards
    let newCurseCount = curseCount;
    let newBlessCount = blessCount;
    let countIncrease = 0;
    let currentCard = cards[currentIndex];
    if (currentCard === CURSE) {
        const totalCurseCount = deckName === "Monsters" ? curseCount : totalCards(state, (deck) => deck.curseCount);
        [newCards, countIncrease] = handleUndoDiscard(cards, currentIndex, totalCurseCount, CURSE);
        newCurseCount = newCurseCount + countIncrease;
    } else if (currentCard === BLESS) {
        const totalBlessCount = deckName === "Monsters" ? blessCount : totalCards(state, (deck) => deck.blessCount);
        [newCards, countIncrease] = handleUndoDiscard(cards, currentIndex, totalBlessCount, BLESS);
        newBlessCount = newBlessCount + countIncrease;
    }
    return {
        cards: newCards,
        currentIndex: currentIndex - 1,
        playedCards: playedCards.slice(1),
        curseCount: newCurseCount,
        blessCount: newBlessCount,
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

function shuffleDeck({cards, currentIndex}) {
    return {
        cards: shuffleCards(cards, currentIndex),
        currentIndex: -1,
        playedCards: [],
    };
}

const defaultState = {
    Monsters: newAttackModifierDeck(BASE_DECK, ""),
};

const APPLY_PERKS = "attackModifierDeck/cards/perks/apply";
const REVEAL_CARD = "attackModifierDeck/cards/next";
const UNDO_CARD = "attackModifierDeck/cards/undo";
const ADD_CARD = "attackModifierDeck/cards/add";

export const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case ADD_PLAYER:
        {
            return {
                ...state,
                [action.name]: newAttackModifierDeck(BASE_DECK, action.class),
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
        case APPLY_PERKS:
        {
            return {
                ...state,
                [action.deckName]: {
                    ...state[action.deckName],
                    perks: action.perks,
                    ...applyPerks(action.perks),
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
                    ...undoCard(state, action.deckName),
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
        case END_TURN:
        {
            return Object.keys(state).reduce((acc, name) => {
                const deck = state[name];
                acc[name] = {
                    ...deck,
                    ...(needsShuffle(deck) ? shuffleDeck(deck) : {playedCards: []}),
                }
                return acc;
            }, {});
        }
        default: return state
    }
}

export function applyPerksAction(name, perks) {
    return {type: APPLY_PERKS, deckName: name, perks};
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
