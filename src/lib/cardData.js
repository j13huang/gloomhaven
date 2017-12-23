const PLUS_ONE = "+1";
const PLUS_TWO = "+2";
const ZERO = "+0";
const MINUS_ONE = "-1";
const MINUS_TWO = "-2";
const NULL = "null";
const TIMES_TWO = "x2";

export const NUMBER_MODIFIERS = {
    PLUS_ONE, PLUS_TWO, ZERO, MINUS_ONE, MINUS_TWO, NULL, TIMES_TWO,
};

const RESHUFFLE = "reshuffle";
const DISCARD = "discard";
const ROLLING = "rolling";
export const END_ACTIONS = {
    RESHUFFLE, DISCARD, ROLLING,
};

export const ATTACK_MODIFIER_DECK = [
    { modifier: ZERO, },
    { modifier: ZERO, },
    { modifier: ZERO, },
    { modifier: ZERO, },
    { modifier: ZERO, },
    { modifier: ZERO, },
    { modifier: PLUS_ONE, },
    { modifier: PLUS_ONE, },
    { modifier: PLUS_ONE, },
    { modifier: PLUS_ONE, },
    { modifier: PLUS_ONE, },
    { modifier: MINUS_ONE, },
    { modifier: MINUS_ONE, },
    { modifier: MINUS_ONE, },
    { modifier: MINUS_ONE, },
    { modifier: MINUS_ONE, },
    { modifier: PLUS_TWO, },
    { modifier: MINUS_TWO, },
    { modifier: TIMES_TWO, endAction: RESHUFFLE, },
    { modifier: NULL, endAction: RESHUFFLE, },
];

export const CURSE = {
    modifier: NULL,
    endAction: DISCARD,
};

export const BLESSING = {
    modifier: TIMES_TWO,
    endAction: DISCARD,
};


export const MONSTER_DECKS = {
    "Bandit Archer": [
        {
            initiative: 20,
            actions: ["move + 0", "attack + 1, range + 1"],
            endAction: RESHUFFLE,
        },
    ],
    "Innox Shaman": [
        {
            initiative: 20,
            actions: ["attack + 1, range + 1"],
            endAction: RESHUFFLE,
        },
        {
            initiative: 64,
            actions: ["attack + 1", "heal 2, range 3"],
        },
    ],
};
export const MONSTER_LIST = Object.keys(MONSTER_DECKS);