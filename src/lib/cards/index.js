import shuffleIcon from "./shuffle.svg";
import rollingIcon from "./rolling.svg";

const PLUS_ONE = "+1";
const PLUS_TWO = "+2";
const PLUS_THREE = "+3";
const PLUS_FOUR = "+4";
const PLUS_ZERO = "+0";
const MINUS_ONE = "-1";
const MINUS_TWO = "-2";
const NULL = "null";
const TIMES_TWO = "x2";

export const NUMBER_MODIFIERS = {
    PLUS_ONE, PLUS_TWO, PLUS_THREE, PLUS_FOUR, PLUS_ZERO, MINUS_ONE, MINUS_TWO, NULL, TIMES_TWO,
};

const SHUFFLE = "shuffle";
const DISCARD = "discard";
const ROLLING = "rolling";
export const END_ACTIONS = {
    SHUFFLE, DISCARD, ROLLING,
};

const endActionIcons = {
    [SHUFFLE]: shuffleIcon,
    [ROLLING]: rollingIcon,
};

export function iconForEndAction(name) {
    return endActionIcons[name];
}

export const BASE_CARDS = {
    PLUS_ZERO: {modifier: PLUS_ZERO},
    PLUS_ONE: {modifier: PLUS_ONE},
    PLUS_TWO: {modifier: PLUS_TWO},
    MINUS_ONE: {modifier: MINUS_ONE},
    MINUS_TWO: {modifier: MINUS_TWO},
    TIMES_TWO: {modifier: TIMES_TWO, endAction: SHUFFLE},
    NULL: {modifier: NULL, endAction: SHUFFLE},
};
export const CURSE = { modifier: NULL, endAction: DISCARD };
export const BLESS = { modifier: TIMES_TWO, endAction: DISCARD };

export const BASE_DECK = [
    BASE_CARDS.PLUS_ZERO,
    BASE_CARDS.PLUS_ZERO,
    BASE_CARDS.PLUS_ZERO,
    BASE_CARDS.PLUS_ZERO,
    BASE_CARDS.PLUS_ZERO,
    BASE_CARDS.PLUS_ZERO,
    BASE_CARDS.PLUS_ONE,
    BASE_CARDS.PLUS_ONE,
    BASE_CARDS.PLUS_ONE,
    BASE_CARDS.PLUS_ONE,
    BASE_CARDS.PLUS_ONE,
    BASE_CARDS.MINUS_ONE,
    BASE_CARDS.MINUS_ONE,
    BASE_CARDS.MINUS_ONE,
    BASE_CARDS.MINUS_ONE,
    BASE_CARDS.MINUS_ONE,
    BASE_CARDS.PLUS_TWO,
    BASE_CARDS.MINUS_TWO,
    BASE_CARDS.TIMES_TWO,
    BASE_CARDS.NULL,
];

// https://gist.github.com/guilhermepontes/17ae0cc71fa2b13ea8c20c94c5c35dc4#gistcomment-2271465
export function shuffle(cards) {
    return cards.map((a) => [Math.random(),a]).sort((a,b) => a[0]-b[0]).map((a) => a[1]);
}

export function needsShuffle({cards, currentIndex}) {
    return cards
        .filter((_, i) => i <= currentIndex)
        .some((c) => c.endAction === END_ACTIONS.SHUFFLE);

}
