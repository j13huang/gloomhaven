const RESHUFFLE = "reshuffle";

export const END_ACTIONS = {
    RESHUFFLE,
};

export const MONSTERS = {
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

export const MONSTER_LIST = Object.keys(MONSTERS);

// https://gist.github.com/guilhermepontes/17ae0cc71fa2b13ea8c20c94c5c35dc4#gistcomment-2271465
export function shuffleDeck(deck) {
    return deck.map((a) => [Math.random(),a]).sort((a,b) => a[0]-b[0]).map((a) => a[1]);
}
