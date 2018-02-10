import {shuffle} from "../lib/cards";
import {newPerksUsage, perksForClass} from "../lib/classes";
import {END_ACTIONS, BASE_DECK, BASE_CARDS, CURSE, BLESS, needsShuffle} from "../lib/cards";
import {LOAD_PARTY} from "./actions/party";
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
        perkUsage: newPerksUsage(characterClass) || [],
        // from items
        minusOneCards: 0,
    };
}

function newDeckWithPerks(characterClass, perkUsage, minusOneCards) {
    let cards = BASE_DECK;
    perkUsage.forEach((pu, i) => {
        const cardModifierFn = perksForClass(characterClass)[i].modifyCards;
        pu.forEach((u) => {
            if (u) {
                cards = cardModifierFn(cards);
            }
        });
    });
    cards = cards.concat(new Array(minusOneCards).fill(BASE_CARDS.MINUS_ONE));
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

function addCard(deck, card) {
    // in case of -1 index
    const currentIndex = Math.max(0, deck.currentIndex);
    const randomIndex = Math.ceil(Math.random() * (deck.cards.length - currentIndex)) + currentIndex;
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

function removeCard(cards, currentIndex, cardToRemove) {
    const matchedCards = cards
        .map((c, i) => [c, i, Math.random()])
        .filter(([c, ...rest], i) => i > currentIndex && c === cardToRemove)

    if (matchedCards.length === 0) {
        return cards;
    }

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
    });

    return [
        ...cards.slice(0, randomValue.index),
        ...cards.slice(randomValue.index + 1),
    ];
}

function handleUndoDiscard(cards, currentIndex, totalCount, cardToRemove) {
    let newCards = cards;
    let countIncrease = 0;

    if (totalCount === 10) {
        newCards = removeCard(cards, currentIndex, cardToRemove);
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
        const totalCurseCount = deckName === "Monsters" ? curseCount : totalCurseCards(state);
        [newCards, countIncrease] = handleUndoDiscard(cards, currentIndex, totalCurseCount, CURSE);
        newCurseCount = newCurseCount + countIncrease;
    } else if (currentCard === BLESS) {
        const totalBlessCount = totalBlessingCards(state);
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

const APPLY_PERK_USAGE = "attackModifierDeck/cards/perks/applyUsage";
const REVEAL_CARD = "attackModifierDeck/cards/next";
const ADD_CARD = "attackModifierDeck/cards/add";
const REMOVE_CARD = "attackModifierDeck/cards/remove";
const UNDO_CARD = "attackModifierDeck/cards/undo";

export const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case LOAD_PARTY:
        {
            const loadedState = Object.entries(action.party).reduce((acc, [playerName, playerData]) => {
                acc[playerName] = {
                    ...newDeckWithPerks(playerData.class, playerData.perkUsage, playerData.minusOneCards),
                    class: playerData.class,
                    perkUsage: playerData.perkUsage,
                    minusOneCards: playerData.minusOneCards,
                };
                return acc;
            }, {});
            return {
                ...defaultState,
                ...loadedState,
            };
        }
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
        case APPLY_PERK_USAGE:
        {
            const deck = state[action.deckName];
            return {
                ...state,
                [action.deckName]: {
                    ...deck,
                    perkUsage: action.perkUsage,
                    minusOneCards: action.minusOneCards,
                    ...newDeckWithPerks(deck.class, action.perkUsage, action.minusOneCards),
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
        case REMOVE_CARD:
        {
            const deck = state[action.deckName];
            return {
                ...state,
                [action.deckName]: {
                    ...deck,
                    cards: removeCard(deck.cards, deck.currentIndex, action.card),
                    curseCount: action.card === CURSE ? deck.curseCount - 1 : deck.curseCount,
                    blessCount: action.card === BLESS ? deck.blessCount - 1 : deck.blessCount,
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

export function applyPerkUsageAction(dispatch, name, perkUsage, minusOneCards) {
    dispatch({type: APPLY_PERK_USAGE, deckName: name, perkUsage, minusOneCards});
}

export function revealNextCardAction(dispatch, name) {
    dispatch({type: REVEAL_CARD, deckName: name});
}

export function undoCardAction(dispatch, name) {
    dispatch({type: UNDO_CARD, deckName: name});
}

export function addCardAction(dispatch, name, card) {
    dispatch({type: ADD_CARD, deckName: name, card});
}

export function removeCardAction(dispatch, name, card) {
    dispatch({type: REMOVE_CARD, deckName: name, card});
}

function totalCurseCards(state) {
    return Object.keys(state).reduce((total, name) => {
        if (name === "Monsters") {
            return total;
        }
        return total + state[name].curseCount;
    }, 0);
}

function totalBlessingCards(state) {
    return Object.keys(state).reduce((total, name) => {
        return total + state[name].blessCount;
    }, 0);
}

export const selectors = {
    totalCurses: (state) => totalCurseCards(state.attackModifierDecks),
    totalBlessings: (state) => totalBlessingCards(state.attackModifierDecks),
};
