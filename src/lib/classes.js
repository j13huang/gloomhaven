import {NUMBER_MODIFIERS} from "./cardData";
import * as elements from "./elements";

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
    "Cragheart": [
        {
            description: "Remove four +0 cards",
            used: [false],
            filterCards: (cards) => new CardsFilter(cards).removeCards(4, NUMBER_MODIFIERS.ZERO).cards(),
        },
        {
            description: "Replace one -1 card with one +1 card",
            used: [false, false, false],
            filterCards: (cards) =>
              new CardsFilter(cards)
              .removeCards(1, NUMBER_MODIFIERS.MINUS_ONE)
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
              .addCards(2, {modifier: "push 2", rolling: true})
              .cards(),
        },
        {
            description: "Add two ROLLING EARTH cards",
            used: [false, false],
            filterCards: (cards) =>
              new CardsFilter(cards)
              .addCards(2, {modifier: elements.EARTH, rolling: true})
              .cards(),
        },
        {
            description: "Add two ROLLING AIR cards",
            used: [false],
            filterCards: (cards) =>
              new CardsFilter(cards)
              .addCards(2, {modifier: elements.AIR, rolling: true})
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
    "Spellweaver": [
        {
            description: "Remove four +0 cards",
            used: [false],
            filterCards: (cards) => new CardsFilter(cards).removeCards(4, NUMBER_MODIFIERS.ZERO).cards(),
        },
        {
            description: "Replace one -1 card with one +1 card",
            used: [false, false],
            filterCards: (cards) =>
              new CardsFilter(cards)
              .removeCards(1, NUMBER_MODIFIERS.MINUS_ONE)
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
              .addCards(1, {modifier: elements.EARTH, rolling: true})
              .addCards(1, {modifier: elements.AIR, rolling: true})
              .cards(),
        },
        {
            description: "Add one ROLLING LIGHT and one ROLLING DARK card",
            used: [false],
            filterCards: (cards) =>
              new CardsFilter(cards)
              .addCards(1, {modifier: elements.LIGHT, rolling: true})
              .addCards(1, {modifier: elements.DARK, rolling: true})
              .cards(),
        },
    ],
    "Tinkerer": [
        {
            description: "Remove two -1 cards",
            used: [false, false],
            filterCards: (cards) => new CardsFilter(cards).removeCards(2, NUMBER_MODIFIERS.MINUS_ONE).cards(),
        },
        {
            description: "Replace one -2 card with one +0 card",
            used: [false],
            filterCards: (cards) =>
              new CardsFilter(cards)
              .removeCards(1, NUMBER_MODIFIERS.MINUS_TWO)
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
              .addCards(2, {modifier: elements.FIRE, rolling: true})
              .cards(),
        },
        {
            description: "Add three ROLLING MUDDLE cards",
            used: [false],
            filterCards: (cards) =>
              new CardsFilter(cards)
              .addCards(3, {modifier: "muddle", rolling: true})
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