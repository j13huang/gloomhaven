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
export const ACTIONS = {
    RESHUFFLE, DISCARD, ROLLING,
};

export const CURSE = {
    modifier: NULL,
    action: DISCARD,
};

export const BLESS = {
    modifier: TIMES_TWO,
    action: DISCARD,
};

export const BASE_DECK = [
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
    { modifier: TIMES_TWO, action: RESHUFFLE, },
    { modifier: NULL, action: RESHUFFLE, },
];

export function shuffleDeck(deck) {
    return deck.map((a) => [Math.random(),a]).sort((a,b) => a[0]-b[0]).map((a) => a[1]);
}
