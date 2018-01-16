import {NUMBER_MODIFIERS, END_ACTIONS} from "../cards";
import * as elements from "../elements";

class CardsFilter {
    constructor(cards) {
        this._cards = cards;
    }

    removeCards(count, cardModifier) {
        let removedCount = 0;
        this._cards = this._cards.filter((c) => {
            const keep = removedCount >= count || c.modifier !== cardModifier;
            if (!keep) {
                removedCount++;
            }
            return keep;
        });
        return this;
    }

    addCards(count, card) {
        this._cards = this._cards.concat(Array(count).fill(card))
        return this;
    }

    cards() {
        return this._cards;
    }
}

const PERKS = {
    "Brute": [
        {
            description: "Remove two -1 cards",
            used: [false],
            filterCards: (cards) => new CardsFilter(cards)
                .removeCards(2, {modifier: NUMBER_MODIFIERS.MINUS_ONE})
                .cards(),
        },
        {
            description: "Replace one -1 card with one +1 card",
            used: [false],
            filterCards: (cards) => new CardsFilter(cards)
                .removeCards(1, {modifier: NUMBER_MODIFIERS.MINUS_ONE})
                .addCards(1, {modifier: NUMBER_MODIFIERS.PLUS_ONE})
                .cards(),
        },
        {
            description: "Add two +1 cards",
            used: [false, false],
            filterCards: (cards) => new CardsFilter(cards)
                .addCards(2, {modifier: NUMBER_MODIFIERS.PLUS_ONE})
                .cards(),
        },
        {
            description: "Add one +3 card",
            used: [false],
            filterCards: (cards) => new CardsFilter(cards)
                .addCards(1, {modifier: NUMBER_MODIFIERS.PLUS_THREE})
                .cards(),
        },
        {
            description: "Add three ROLLING PUSH 1 cards",
            used: [false, false],
            filterCards: (cards) => new CardsFilter(cards)
                .addCards(3, {modifier: "push 1", endAction: END_ACTIONS.ROLLING})
                .cards(),
        },
        {
            description: "Add two ROLLING PIERCE 3 cards",
            used: [false],
            filterCards: (cards) => new CardsFilter(cards)
                .addCards(2, {modifier: "pierce 3", endAction: END_ACTIONS.ROLLING})
                .cards(),
        },
        {
            description: "Add one ROLLING STUN card",
            used: [false, false],
            filterCards: (cards) => new CardsFilter(cards)
                .addCards(1, {modifier: "stun", endAction: END_ACTIONS.ROLLING})
                .cards(),
        },
        {
            description: "Add one ROLLING DISARM card and one ROLLING MUDDLE card",
            used: [false],
            filterCards: (cards) => new CardsFilter(cards)
                .addCards(1, {modifier: "disarm", endAction: END_ACTIONS.ROLLING})
                .addCards(1, {modifier: "muddle", endAction: END_ACTIONS.ROLLING})
                .cards(),
        },
        {
            description: "Add one ROLLING ADD TARGET card",
            used: [false, false],
            filterCards: (cards) => new CardsFilter(cards)
                .addCards(1, {modifier: "add target", endAction: END_ACTIONS.ROLLING})
                .cards(),
        },
        {
            description: "Add one +1 shield 1, self card",
            used: [false],
            filterCards: (cards) => new CardsFilter(cards)
                .addCards(1, {modifier: NUMBER_MODIFIERS.PLUS_ONE, extra: "shield 1, self"})
                .cards(),
        },
        {
            description: "Ignore negative item effects and add one +1 card",
            used: [false],
            filterCards: (cards) => new CardsFilter(cards)
                .addCards(1, {modifier: NUMBER_MODIFIERS.PLUS_ONE})
                .cards(),
        },
    ],
    "Cragheart": [
        {
            description: "Remove four +0 cards",
            used: [false],
            filterCards: (cards) => new CardsFilter(cards)
                .removeCards(4, {modifier: NUMBER_MODIFIERS.ZERO})
                .cards(),
        },
        {
            description: "Replace one -1 card with one +1 card",
            used: [false, false, false],
            filterCards: (cards) =>
              new CardsFilter(cards)
              .removeCards(1, {modifier: NUMBER_MODIFIERS.MINUS_ONE})
              .addCards(1, {modifier: NUMBER_MODIFIERS.PLUS_ONE})
              .cards(),
        },
        {
            description: "Add one -2 card and two +2 cards",
            used: [false],
            filterCards: (cards) =>
              new CardsFilter(cards)
              .addCards(1, {modifier: NUMBER_MODIFIERS.MINUS_TWO})
              .addCards(2, {modifier: NUMBER_MODIFIERS.PLUS_TWO})
              .cards(),
        },
        {
            description: "Add one +1 IMMOBILIZE card",
            used: [false, false],
            filterCards: (cards) =>
              new CardsFilter(cards)
              .addCards(1, {modifier: NUMBER_MODIFIERS.PLUS_ONE, extra: "immobilize"})
              .cards(),
        },
        {
            description: "Add one +2 MUDDLE card",
            used: [false, false],
            filterCards: (cards) =>
              new CardsFilter(cards)
              .addCards(1, {modifier: NUMBER_MODIFIERS.PLUS_TWO, extra: "muddle"})
              .cards(),
        },
        {
            description: "Add two PUSH 2 cards",
            used: [false],
            filterCards: (cards) =>
              new CardsFilter(cards)
              .addCards(2, {modifier: "push 2", endAction: END_ACTIONS.ROLLING})
              .cards(),
        },
        {
            description: "Add two ROLLING EARTH cards",
            used: [false, false],
            filterCards: (cards) =>
              new CardsFilter(cards)
              .addCards(2, {modifier: elements.EARTH, endAction: END_ACTIONS.ROLLING})
              .cards(),
        },
        {
            description: "Add two ROLLING AIR cards",
            used: [false],
            filterCards: (cards) =>
              new CardsFilter(cards)
              .addCards(2, {modifier: elements.AIR, endAction: END_ACTIONS.ROLLING})
              .cards(),
        },
        {
            description: "Ignore negative item effects",
            used: [false],
            filterCards: (cards) => cards,
        },
        {
            description: "Ignore negative dungeon effects",
            used: [false],
            filterCards: (cards) => cards,
        },
    ],
    "Mindthief": [
        {
            description: "Remove two -1 cards",
            used: [false, false],
            filterCards: (cards) => new CardsFilter(cards)
                .removeCards(2, {modifier: NUMBER_MODIFIERS.MINUS_ONE})
                .cards(),
        },
        {
            description: "Remove four +0 cards",
            used: [false],
            filterCards: (cards) => new CardsFilter(cards)
                .removeCards(4, {modifier: NUMBER_MODIFIERS.PLUS_ZERO})
                .cards(),
        },
        {
            description: "Replace two +1 cards with two +2 cards",
            used: [false],
            filterCards: (cards) => new CardsFilter(cards)
                .removeCards(2, {modifier: NUMBER_MODIFIERS.PLUS_ONE})
                .addCards(2, {modifier: NUMBER_MODIFIERS.PLUS_TWO})
                .cards(),
        },
        {
            description: "Replace one -2 card with one +0 cards",
            used: [false],
            filterCards: (cards) => new CardsFilter(cards)
                .removeCards(1, {modifier: NUMBER_MODIFIERS.MINUS_TWO})
                .addCards(1, {modifier: NUMBER_MODIFIERS.PLUS_ZERO})
                .cards(),
        },
        {
            description: "Add one +2 ICE card",
            used: [false, false],
            filterCards: (cards) => new CardsFilter(cards)
                .addCards(1, {modifier: NUMBER_MODIFIERS.PLUS_ZERO, extra: elements.ICE})
                .cards(),
        },
        {
            description: "Add two ROLLING +1 cards",
            used: [false, false],
            filterCards: (cards) => new CardsFilter(cards)
                .addCards(2, {modifier: NUMBER_MODIFIERS.PLUS_ONE, endAction: END_ACTIONS.ROLLING})
                .cards(),
        },
        {
            description: "Add three ROLLING PULL 1 cards",
            used: [false],
            filterCards: (cards) => new CardsFilter(cards)
                .addCards(3, {modifier: "pull 1", endAction: END_ACTIONS.ROLLING})
                .cards(),
        },
        {
            description: "Add three ROLLING MUDDLE cards",
            used: [false],
            filterCards: (cards) => new CardsFilter(cards)
                .addCards(3, {modifier: "muddle", endAction: END_ACTIONS.ROLLING})
                .cards(),
        },
        {
            description: "Add two ROLLING IMMOBILIZE cards",
            used: [false],
            filterCards: (cards) => new CardsFilter(cards)
                .addCards(2, {modifier: "immobilize", endAction: END_ACTIONS.ROLLING})
                .cards(),
        },
        {
            description: "Add one ROLLING STUN card",
            used: [false],
            filterCards: (cards) => new CardsFilter(cards)
                .addCards(1, {modifier: "stun", endAction: END_ACTIONS.ROLLING})
                .cards(),
        },
        {
            description: "Add one ROLLING DISARM card and one ROLLING MUDDLE card",
            used: [false],
            filterCards: (cards) => new CardsFilter(cards)
                .addCards(1, {modifier: "disarm", endAction: END_ACTIONS.ROLLING})
                .addCards(1, {modifier: "muddle", endAction: END_ACTIONS.ROLLING})
                .cards(),
        },
        {
            description: "Ignore negative scenario effects",
            used: [false],
            filterCards: (cards) => cards,
        },
    ],
    "Scoundrel": [
        {
            description: "Remove two -1 cards",
            used: [false, false],
            filterCards: (cards) => new CardsFilter(cards)
                .removeCards(2, {modifier: NUMBER_MODIFIERS.MINUS_ONE})
                .cards(),
        },
        {
            description: "Remove four +0 cards",
            used: [false],
            filterCards: (cards) => new CardsFilter(cards)
                .removeCards(4, {modifier: NUMBER_MODIFIERS.PLUS_ZERO})
                .cards(),
        },
        {
            description: "Replace one -2 card with one +0 card",
            used: [false],
            filterCards: (cards) => new CardsFilter(cards)
                .removeCards(1, {modifier: NUMBER_MODIFIERS.MINUS_TWO})
                .addCards(1, {modifier: NUMBER_MODIFIERS.PLUS_ZERO})
                .cards(),
        },
        {
            description: "Replace one -1 card with one +1 card",
            used: [false],
            filterCards: (cards) => new CardsFilter(cards)
                .removeCards(1, {modifier: NUMBER_MODIFIERS.MINUS_ONE})
                .addCards(1, {modifier: NUMBER_MODIFIERS.PLUS_ONE})
                .cards(),
        },
        {
            description: "Replace one +0 card with one +2 card",
            used: [false, false],
            filterCards: (cards) => new CardsFilter(cards)
                .removeCards(1, {modifier: NUMBER_MODIFIERS.PLUS_ZERO})
                .addCards(1, {modifier: NUMBER_MODIFIERS.PLUS_TWO})
                .cards(),
        },
        {
            description: "Add two ROLLING +1 cards",
            used: [false, false],
            filterCards: (cards) => new CardsFilter(cards)
                .addCards(2, {modifier: NUMBER_MODIFIERS.PLUS_ONE, endAction: END_ACTIONS.ROLLING})
                .cards(),
        },
        {
            description: "Add two ROLLING PIERCE 3 cards",
            used: [false],
            filterCards: (cards) => new CardsFilter(cards)
                .addCards(2, {modifier: "pierce 3", endAction: END_ACTIONS.ROLLING})
                .cards(),
        },
        {
            description: "Add two ROLLING POISON cards",
            used: [false, false],
            filterCards: (cards) => new CardsFilter(cards)
                .addCards(2, {modifier: "poison", endAction: END_ACTIONS.ROLLING})
                .cards(),
        },
        {
            description: "Add two ROLLING MUDDLE cards",
            used: [false],
            filterCards: (cards) => new CardsFilter(cards)
                .addCards(2, {modifier: "muddle", endAction: END_ACTIONS.ROLLING})
                .cards(),
        },
        {
            description: "Add one ROLLING INVISIBLE card",
            used: [false],
            filterCards: (cards) => new CardsFilter(cards)
                .addCards(1, {modifier: "invisible", endAction: END_ACTIONS.ROLLING})
                .cards(),
        },
        {
            description: "Ignore negative scenario effects",
            used: [false],
            filterCards: (cards) => cards,
        },
    ],
    "Spellweaver": [
        {
            description: "Remove four +0 cards",
            used: [false],
            filterCards: (cards) => new CardsFilter(cards)
                .removeCards(4, {modifier: NUMBER_MODIFIERS.ZERO})
                .cards(),
        },
        {
            description: "Replace one -1 card with one +1 card",
            used: [false, false],
            filterCards: (cards) =>
              new CardsFilter(cards)
              .removeCards(1, {modifier: NUMBER_MODIFIERS.MINUS_ONE})
              .addCards(1, {modifier: NUMBER_MODIFIERS.PLUS_ONE})
              .cards(),
        },
        {
            description: "Add two +1 cards",
            used: [false, false],
            filterCards: (cards) =>
              new CardsFilter(cards)
              .addCards(2, {modifier: NUMBER_MODIFIERS.PLUS_ONE})
              .cards(),
        },
        {
            description: "Add one +0 STUN card",
            used: [false],
            filterCards: (cards) =>
              new CardsFilter(cards)
              .addCards(1, {modifier: NUMBER_MODIFIERS.PLUS_ZERO, extra: "stun"})
              .cards(),
        },
        {
            description: "Add one +1 WOUND card",
            used: [false],
            filterCards: (cards) =>
              new CardsFilter(cards)
              .addCards(1, {modifier: NUMBER_MODIFIERS.PLUS_ONE, extra: "wound"})
              .cards(),
        },
        {
            description: "Add one +1 IMMOBILIZE card",
            used: [false],
            filterCards: (cards) =>
              new CardsFilter(cards)
              .addCards(1, {modifier: NUMBER_MODIFIERS.PLUS_ONE, extra: "immobilize"})
              .cards(),
        },
        {
            description: "Add one +1 CURSE card",
            used: [false],
            filterCards: (cards) =>
              new CardsFilter(cards)
              .addCards(1, {modifier: NUMBER_MODIFIERS.PLUS_ONE, extra: "curse"})
              .cards(),
        },
        {
            description: "Add one +2 FIRE card",
            used: [false, false],
            filterCards: (cards) =>
              new CardsFilter(cards)
              .addCards(1, {modifier: NUMBER_MODIFIERS.PLUS_TWO, extra: elements.FIRE})
              .cards(),
        },
        {
            description: "Add one +2 ICE card",
            used: [false, false],
            filterCards: (cards) =>
              new CardsFilter(cards)
              .addCards(1, {modifier: NUMBER_MODIFIERS.PLUS_TWO, extra: elements.ICE})
              .cards(),
        },
        {
            description: "Add one ROLLING EARTH and one ROLLING AIR card",
            used: [false],
            filterCards: (cards) =>
              new CardsFilter(cards)
              .addCards(1, {modifier: elements.EARTH, endAction: END_ACTIONS.ROLLING})
              .addCards(1, {modifier: elements.AIR, endAction: END_ACTIONS.ROLLING})
              .cards(),
        },
        {
            description: "Add one ROLLING LIGHT and one ROLLING DARK card",
            used: [false],
            filterCards: (cards) =>
              new CardsFilter(cards)
              .addCards(1, {modifier: elements.LIGHT, endAction: END_ACTIONS.ROLLING})
              .addCards(1, {modifier: elements.DARK, endAction: END_ACTIONS.ROLLING})
              .cards(),
        },
    ],
    "Tinkerer": [
        {
            description: "Remove two -1 cards",
            used: [false, false],
            filterCards: (cards) => new CardsFilter(cards)
                .removeCards(2, {modifier: NUMBER_MODIFIERS.MINUS_ONE})
                .cards(),
        },
        {
            description: "Replace one -2 card with one +0 card",
            used: [false],
            filterCards: (cards) =>
              new CardsFilter(cards)
              .removeCards(1, {modifier: NUMBER_MODIFIERS.MINUS_TWO})
              .addCards(1, {modifier: NUMBER_MODIFIERS.PLUS_ONE})
              .cards(),
        },
        {
            description: "Add two +1 cards",
            used: [false],
            filterCards: (cards) =>
              new CardsFilter(cards)
              .addCards(2, {modifier: NUMBER_MODIFIERS.PLUS_ONE})
              .cards(),
        },
        {
            description: "Add one +3 card",
            used: [false],
            filterCards: (cards) =>
              new CardsFilter(cards)
              .addCards(1, {modifier: NUMBER_MODIFIERS.PLUS_THREE})
              .cards(),
        },
        {
            description: "Add two ROLLING FIRE card",
            used: [false],
            filterCards: (cards) =>
              new CardsFilter(cards)
              .addCards(2, {modifier: elements.FIRE, endAction: END_ACTIONS.ROLLING})
              .cards(),
        },
        {
            description: "Add three ROLLING MUDDLE cards",
            used: [false],
            filterCards: (cards) =>
              new CardsFilter(cards)
              .addCards(3, {modifier: "muddle", endAction: END_ACTIONS.ROLLING})
              .cards(),
        },
        {
            description: "Add one +1 WOUND card",
            used: [false, false],
            filterCards: (cards) =>
              new CardsFilter(cards)
              .addCards(1, {modifier: NUMBER_MODIFIERS.PLUS_ONE, extra: "wound"})
              .cards(),
        },
        {
            description: "Add one +1 IMMOBILIZE card",
            used: [false, false],
            filterCards: (cards) =>
              new CardsFilter(cards)
              .addCards(1, {modifier: NUMBER_MODIFIERS.PLUS_ONE, extra: "immobilize"})
              .cards(),
        },
        {
            description: "Add one +1 Heal 2 self card",
            used: [false, false],
            filterCards: (cards) =>
              new CardsFilter(cards)
              .addCards(2, {modifier: NUMBER_MODIFIERS.PLUS_ONE, extra: "Heal 2 self"})
              .cards(),
        },
        {
            description: "Add one +0 ADD TARGET card",
            used: [false],
            filterCards: (cards) =>
              new CardsFilter(cards)
              .addCards(1, {modifier: NUMBER_MODIFIERS.PLUS_ZERO, extra: "add target"})
              .cards(),
        },
        {
            description: "Ignore negative scenario effects",
            used: [false],
            filterCards: (cards) => cards,
        },
    ],
};

export function newPerks(characterClass) {
    const perks = PERKS[characterClass];
    if (perks) {
        return perks.map((p) => ({...p}));
    }
    return null;
}

export const CLASSES = Object.keys(PERKS);